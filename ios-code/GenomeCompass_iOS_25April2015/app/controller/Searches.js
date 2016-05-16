Ext.define('GenomeCompass.controller.Searches', {
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.data.JsonP'
	],
	config: {
		refs: {
			// We're going to look up our views by xtype.
			mainView: 'mainview',
			searchPanelView: 'searchpanelview',
			searchListView: 'searchlistview',
			favesPanelView: 'favespanelview',
			favesListView: 'faveslistview',
			trashSearchPanel: 'trashsearchpanel',
			// Look up components by id
			searchMGI: '.searchlistview #searchMGI',
			searchListAddButton: '.searchlistview #searchListAddButton',
			favesEditButton: '.faveslistview #favesEditButton',
			faveSearchToolbar: '.faveslistview #faveSearchToolbar',
			trashSearchPanelPopup: {
				autoCreate: true,
				selector: '#trashSearchPanel',
				xtype: 'trashsearchpanel'
			},
			trashSearchPanelConfirmButton: '.trashsearchpanel #trashSearchPanelConfirmButton',
			trashSearchPanelCancelButton: '.trashsearchpanel #trashSearchPanelCancelButton'
		},
		control: {
			searchMGI: { 
				change: 'onSearchSubmittedCommand',
				clearSearchCommand: 'onClearSearchCommand'
			},
			searchListView: {
				openSearchResultUrlCommand: 'onOpenSearchResultUrlCommand',
//				searchListItemSwipeCommand: 'onSearchListItemSwipeCommand',
				changeTheBoxCommand: 'onChangeTheBoxCommand'
			},
			trashSearchPanelConfirmButton: {
				tap: 'onTrashSearchPanelConfirmButtonCommand'
			},
			trashSearchPanelCancelButton: {
				tap: 'onTrashSearchPanelCancelButtonCommand'
			}
		}
	},
	// Slide Transition Commands
	getSlideUpTransition: function () {
		return { type: 'slide', direction: 'up' };
	},	

	getSlideDownTransition: function () {
		return { type: 'slide', direction: 'down' };
	},	

	getSlideLeftTransition: function () {
		return { type: 'slide', direction: 'left' };
	}, 

	getSlideRightTransition: function () {
		return { type: 'slide', direction: 'right' };
	},	
	
	onSearchSubmittedCommand: function() {

		var searchListView = this.getSearchListView(),
			searchMGI = this.getSearchMGI(),
			searchTerm = searchMGI.getValue(),
			searchListAddButton = this.getSearchListAddButton();


		// if the user just cleared the search
		if (searchTerm == '') { 
			/* don't do anything */ 
		} // end of if

		// if they actually entered a search term...
		else {

			//first we set the mask of the searchlistview to show a loading message
			searchListView.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});

			// actually do the search
			this.doSearch(searchTerm, searchListView, searchListAddButton);
		} // end of else

	}, // end of onSearchSubmittedCommand function

	doSearch: function(searchTerm, searchListView, searchListAddButton) {

		// make the JSONP call to the backend server
		Ext.data.JsonP.request({
			url: 'http://proto.informatics.jax.org/prototypes/iphone_app/cgi/searchMGI.php',
			callbackKey: 'callback',     // the callbackKey is used for JSONP requests
			withCredentials: true,       // JSONP things
			useDefaultXhrHeader: false,  // JSONP things
			timeout: 5000,

			// now we define the params to be sent to the server
			params: {
				term: searchTerm,
				format: 'json'
			},

			success: function(rtndata) {

				// make sure all three result arrays are defined
				// otherwise, throw an error
				var gf_results = rtndata.gf_results,
					pheno_results = rtndata.pheno_results,
					disease_results = rtndata.disease_results;

				if ((! gf_results) || (! pheno_results) || (! disease_results)) {

					// unmask the searchListView and display an error
					searchListView.unmask();
					Ext.Msg.alert('', 'There was an error retrieving your search results', Ext.emptyFn);										
				} // end of if

				else {
					// get counts for gene and pheno results
					var numGenes = gf_results.length,
						numPhenos = pheno_results.length,
						numDiseases = disease_results.length,
						numPhenoDisease = numPhenos + numDiseases;
			
					// if the search returned no results
					if ((numGenes == 0) && (numPhenoDisease == 0) && (searchTerm != '')) {
						// alert the user
						Ext.Msg.alert('', 'Your search returned no results', Ext.emptyFn);											
					} // end of if

					// otherwise, if there are results, store and display them
					else {

						//** Genome Feature results **//

						// get a reference to the gfSearchResults store and clear it out
						var favoritesStore = Ext.getStore('favoritesstore'),
							gfSearchResultsStore = Ext.getStore('gfsearchresults');
						gfSearchResultsStore.removeAll();
						gfSearchResultsStore.sync();

						for (var i=0; i < numGenes; i++) {
							var gf_subArray = gf_results[i],
								gf_mgi = gf_subArray["mgi"],
								gf_symbol = gf_subArray["symbol"],
								gf_supTxt = gf_subArray["supTxt"],
								gf_term = "",
								gf_name = gf_subArray["name"],
								gf_url = gf_subArray["url"],
								gf_type = gf_subArray["type"], // gene or allele or pheno or disease
								gf_key = gf_subArray["key"],
								gf_feature_type = gf_subArray["feature_type"],
								gf_chr = gf_subArray["chr"],
								gf_coords = gf_subArray["coords"],
								gf_location = gf_chr + ":" + gf_coords,
								gf_state = "resources/images/iconmonstr-star-unfilled.svg",
								gf_index = i;                                                                                                                                                      

							// figure out if this search result is already in the user's favorites list
							// if find is true, a record with this mgi id is already in the user's favorites list,
							// so set the icon of the record before we publish it to the list
							var find = favoritesStore.find('mgiId', gf_mgi);
							if (find != -1) {
								gf_state = "resources/images/iconmonstr-star-filled.svg";
							} // end of if

							// add the data to the gfSearchResultsStore store
							var gfRecordData = Ext.create('GenomeCompass.model.SearchResult', {
								mgiId: gf_mgi,
								symbol: gf_symbol,
								label: gf_symbol,
								supTxt: gf_supTxt,
								term: gf_term,
								name: gf_name,
								url: gf_url,
								type: gf_type,
								key: gf_key,
								feature_type: gf_feature_type,
								chr: gf_chr,
								coords: gf_coords,
								location: gf_location,
								state: gf_state,
								index: gf_index
							});

							var gfNewRecord = gfSearchResultsStore.add(gfRecordData);

							Ext.each(gfNewRecord, function(record) {
								record.phantom = true;
							});
							
							gfSearchResultsStore.sync();
						} // end of for loop


						//** Phenotype results **//

						// get a reference to the phenoSearchResults store and clear it out
						var phenoSearchResultsStore = Ext.getStore('phenosearchresults');
						phenoSearchResultsStore.removeAll();
						phenoSearchResultsStore.sync();

						for (var i=0; i < numPhenos; i++) {
							var pheno_subArray = pheno_results[i],
								pheno_mgi = pheno_subArray["mgi"],
								pheno_term = pheno_subArray["term"],
								pheno_symbol = "",
								pheno_supTxt = "",
								pheno_name = "",
								pheno_url = pheno_subArray["url"],
								pheno_type = pheno_subArray["type"], // gene or allele or pheno or disease
								pheno_key = pheno_subArray["key"],
								pheno_feature_type = pheno_subArray["feature_type"],
								pheno_chr = "",
								pheno_coords = "",
								pheno_location = "",
								pheno_state = "resources/images/iconmonstr-star-unfilled.svg",
								pheno_index = i;                                                                                                                                                       

							// figure out if this search result is already in the user's favorites list
							// if find is true, a record with this mgi id is already in the user's favorites list,
							// so set the icon of the record before we publish it to the list
							var find = favoritesStore.find('mgiId', pheno_mgi);
							if (find != -1) {
								pheno_state = "resources/images/iconmonstr-star-filled.svg";
							} // end of if


							// add the data to the phenoSearchResultsStore store
							var phenoRecordData = Ext.create('GenomeCompass.model.SearchResult', {
								mgiId: pheno_mgi,
								term: pheno_term,
								label: pheno_term,
								symbol: pheno_symbol,
								supTxt: pheno_supTxt,
								name: pheno_name,
								url: pheno_url,
								type: pheno_type,
								key: pheno_key,
								feature_type: pheno_feature_type,
								chr: pheno_chr,
								coords: pheno_coords,
								location: pheno_location,
								state: pheno_state,
								index: pheno_index							
							});

							var phenoNewRecord = phenoSearchResultsStore.add(phenoRecordData);

							Ext.each(phenoNewRecord, function(record) {
								record.phantom = true;
							});
							
							phenoSearchResultsStore.sync();
						} // end of for loop


						//** Disease results **//

						// get a reference to the diseaseSearchResults store and clear it out
						var diseaseSearchResultsStore = Ext.getStore('diseasesearchresults');
						diseaseSearchResultsStore.removeAll();
						diseaseSearchResultsStore.sync();

						for (var i=0; i < numDiseases; i++) {
							var disease_subArray = disease_results[i],
								disease_mgi = disease_subArray["mgi"],
								disease_term = disease_subArray["term"],
								disease_symbol = "",
								disease_supTxt = "",
								disease_name = "",
								disease_url = disease_subArray["url"],
								disease_type = disease_subArray["type"], // gene or allele or pheno or disease
								disease_key = disease_subArray["key"],
								disease_feature_type = disease_subArray["feature_type"],
								disease_chr = "",
								disease_coords,
								disease_location,
								disease_state = "resources/images/iconmonstr-star-unfilled.svg",
								disease_index = i;                                                                                                                                                        

							// figure out if this search result is already in the user's favorites list
							// if find is true, a record with this mgi id is already in the user's favorites list,
							// so set the icon of the record before we publish it to the list
							var find = favoritesStore.find('mgiId', disease_mgi);
							if (find != -1) {
								disease_state = "resources/images/iconmonstr-star-filled.svg";
							} // end of if                                                                                                                                                   

							// add the data to the diseaseSearchResultsStore store
							var diseaseRecordData = Ext.create('GenomeCompass.model.SearchResult', {
								mgiId: disease_mgi,
								term: disease_term,
								label: disease_term,
								symbol: disease_symbol,
								supTxt: disease_supTxt,
								name: disease_name,
								url: disease_url,
								type: disease_type,
								key: disease_key,
								feature_type: disease_feature_type,
								chr: disease_chr,
								coords: disease_coords,
								location: disease_location,
								state: disease_state,
								index: disease_index						
							});

							var diseaseNewRecord = diseaseSearchResultsStore.add(diseaseRecordData);

							Ext.each(diseaseNewRecord, function(record) {
								record.phantom = true;
							});
							
							diseaseSearchResultsStore.sync();
						} // end of for loop                        


						//** Merge the three results stores **//

						// get a reference to the allSearchResults store and clear it out
						var index = 0,
							allSearchResultsStore = Ext.getStore('allsearchresults');
						allSearchResultsStore.removeAll();
						allSearchResultsStore.sync();
						
						// add the gf_results store records
						gfSearchResultsStore.each(function(record) {
							var gfRecordData = Ext.create('GenomeCompass.model.SearchResult', {
								mgiId: record.data.mgiId,
								symbol: record.data.symbol,
								label: record.data.label,
								supTxt: record.data.supTxt,
								term: record.data.term,
								name: record.data.name,
								url: record.data.url,
								type: record.data.type,
								key: record.data.key,
								feature_type: record.data.feature_type,
								chr: record.data.chr,
								coords: record.data.coords,
								location: record.data.location,
								state: record.data.state,
								origin: 'gf_results',
								disp_filter: 'Genes',
								group_index: '1',
								index: index
							});
							var allNewRecord = allSearchResultsStore.add(gfRecordData);
							Ext.each(allNewRecord, function(record) {
								record.phantom = true;
							});
							allSearchResultsStore.sync();

							index ++;
						});

						// add the disease_results store records
						diseaseSearchResultsStore.each(function(record) {
							var diseaseRecordData = Ext.create('GenomeCompass.model.SearchResult', {
								mgiId: record.data.mgiId,
								symbol: record.data.symbol,
								label: record.data.label,
								supTxt: record.data.supTxt,
								term: record.data.term,
								name: record.data.name,
								url: record.data.url,
								type: record.data.type,
								key: record.data.key,
								feature_type: record.data.feature_type,
								chr: record.data.chr,
								coords: record.data.coords,
								location: record.data.location,								
								state: record.data.state,
								origin: 'disease_results',
								disp_filter: 'Diseases/Phenotypes',
								group_index: '2',
								index: index								
							});
							var allNewRecord = allSearchResultsStore.add(diseaseRecordData);
							Ext.each(allNewRecord, function(record) {
								record.phantom = true;
							});
							allSearchResultsStore.sync();

							index ++;							
						});                                         

						// add the pheno_results store records
						phenoSearchResultsStore.each(function(record) {
							var phenoRecordData = Ext.create('GenomeCompass.model.SearchResult', {
								mgiId: record.data.mgiId,
								symbol: record.data.symbol,
								label: record.data.label,
								supTxt: record.data.supTxt,
								term: record.data.term,
								name: record.data.name,
								url: record.data.url,
								type: record.data.type,
								key: record.data.key,
								feature_type: record.data.feature_type,
								chr: record.data.chr,
								coords: record.data.coords,
								location: record.data.location,								
								state: record.data.state,
								origin: 'pheno_results',
								disp_filter: 'Diseases/Phenotypes',
								group_index: '2',
								index: index								
							});
							var allNewRecord = allSearchResultsStore.add(phenoRecordData);
							Ext.each(allNewRecord, function(record) {
								record.phantom = true;
							});
							allSearchResultsStore.sync();

							index ++;							
						});                           

						// refresh the list to display the updated data
						searchListView.refresh();
					} // end of else

					// unmask the searchListView
					searchListView.unmask();
				} // end of else
			},
			failure: function(response) {
				
				if (response.timedout) {
					Ext.Msg.alert('Timeout', "The server timed out :(");
				
				} else if (response.aborted) {
					Ext.Msg.alert('Aborted', "Looks like you aborted the request");
				
				} else if(!Ext.util.Connection.isOnline()) {
    				Ext.Msg.alert('No Internet Connectivity', 
    						"This application requires an internect connection.  Please check your connection.");			
				} else {
					Ext.Msg.alert('Bad', "Something went wrong with your request");
				} // end of else
				// unmask the searchListView
				searchListView.unmask();
			}, // end of failure function
			callback: function(options, success, response) { }
		});
	}, // end doSearch function
	onOpenSearchResultUrlCommand: function(list, record) {

		// open a web browser and display the item's detail page
		var url = record.data.url;
		var ref = window.open(url, '_system', 'location=yes', 'closebuttoncaption=Done');
	}, // end onOpenSearchResultUrlCommand
	onChangeTheBoxCommand: function (list, record) {

		var searchListView = this.getSearchListView(),
			favesListView = this.getFavesListView(),
			favoritesStore = Ext.getStore('favoritesstore'),
			allSearchResultsStore = Ext.getStore('allsearchresults'),
			mgiId = record.data.mgiId,
			state = record.data.state,
			checked = "resources/images/iconmonstr-star-filled.svg",
			unchecked = "resources/images/iconmonstr-star-unfilled.svg";

			// change the state to the opposite of whatever it was
			// ** eventually change this so the state is checked or unchecked
			// ** and the store converts the state to the url returned to the view
			if (state == checked) {
				// otherwise just remove it
				record.set('state', unchecked); 

				// remove from favorites
				this.getApplication().getController('GenomeCompass.controller.Searches').onShowTrashConfirmCommand(record);
			} else if (state == unchecked) { 
				record.set('state', checked); 
				// add to favorites
				this.onAddFaveCommand(record);
			} // end of else if

			// sync the store and refresh the view
			allSearchResultsStore.sync();
			searchListView.refresh();
	//	} // end of else
	}, // end onChangeTheBoxCommand
	onClearSearchCommand: function () {

		var searchListAddButton = this.getSearchListAddButton(),
			searchListView = this.getSearchListView(),
			allSearchResultsStore = Ext.getStore('allsearchresults');

		// clear the store
		allSearchResultsStore.removeAll();
		allSearchResultsStore.sync();

		// refresh the view
		searchListView.refresh();
	}, // end onClearSearchCommand
	onAddFaveCommand: function (record) {

		var mainView = Ext.Viewport.getComponent(0),
			searchListView = this.getSearchListView(),
			allSearchResultsStore = Ext.getStore('allsearchresults'),
			favoritesStore = Ext.getStore('favoritesstore'),
			checked = "resources/images/iconmonstr-star-filled.svg",
			type = record.data.type,
			now = new Date(),
			format = 'D M j, Y',
			formatted = Ext.Date.format(now,format);

		record.set('user_label', 'Unlock to add labels');
		record.set('notes', 'Unlock to edit notes');
		record.set('state', checked);
		record.set('date_created', formatted);

		if (type == 'Gene') {
			record.set('pref_newRef', '1'); // gene, pheno, disease
			record.set('pref_newAllele', '1'); // gene
			record.set('pref_newPhenoAssoc', '1'); // gene
			record.set('pref_newDiseaseAssoc', '1'); // gene
			record.set('pref_newGoTerm', '1'); // gene
			record.set('pref_nomenChange', '1'); // gene, pheno, disease
			record.set('pref_newGeneAssoc', '0'); // pheno, disease
			record.set('pref_newAlleleAssoc', '0'); // pheno, disease
			record.set('pref_newGenotypeAssoc', '0'); // pheno, disease								
		} else if (type == 'Phenotype') {
			record.set('pref_newRef', '1'); // gene, pheno, disease
			record.set('pref_newAllele', '0'); // gene
			record.set('pref_newPhenoAssoc', '0'); // gene
			record.set('pref_newDiseaseAssoc', '0'); // gene
			record.set('pref_newGoTerm', '0'); // gene
			record.set('pref_nomenChange', '1'); // gene, pheno, disease
			record.set('pref_newGeneAssoc', '1'); // pheno, disease
			record.set('pref_newAlleleAssoc', '1'); // pheno, disease
			record.set('pref_newGenotypeAssoc', '1'); // pheno, disease								
		} else if (type == 'Disease') {
			record.set('pref_newRef', '1'); // gene, pheno, disease
			record.set('pref_newAllele', '0'); // gene
			record.set('pref_newPhenoAssoc', '0'); // gene
			record.set('pref_newDiseaseAssoc', '0'); // gene
			record.set('pref_newGoTerm', '0'); // gene
			record.set('pref_nomenChange', '1'); // gene, pheno, disease
			record.set('pref_newGeneAssoc', '1'); // pheno, disease
			record.set('pref_newAlleleAssoc', '1'); // pheno, disease
			record.set('pref_newGenotypeAssoc', '1'); // pheno, disease								
		} // end of else if

		favoritesStore.add(record);
		favoritesStore.sync();
		searchListView.refresh();

		// get the number of Favorites
		this.getApplication().getController('GenomeCompass.controller.Faves').onCheckNumFavesCommand();
	}, // end onAddFaveCommand
	onShowTrashConfirmCommand: function(record) {

	// make sure the user selected at least one favorite to trash
	var favoritesStore = Ext.getStore('favoritesstore'),
	unchecked = "resources/images/iconmonstr-star-unfilled.svg",
	allChecked = true,
	favesEditButton = this.getFavesEditButton(),
	popup = this.getTrashSearchPanelPopup(),
	trashSearchPanelConfirmButton = this.getTrashSearchPanelConfirmButton();


	// change the button text to be item-specific
	var string = "Remove " + record.data.label;
	trashSearchPanelConfirmButton.setText(string);

	// bind the record to the popup
	popup.setRecord(record);

	// and add the popup to the viewport
	// and show it
	Ext.Viewport.add(popup);
	popup.show(this.getSlideUpTransition());
	},
	onRemoveFaveCommand: function () {
			
		var popup = this.getTrashSearchPanelPopup(),
			record = popup.getRecord(),
			allSearchResultsStore = Ext.getStore('allsearchresults'),
			favoritesStore = Ext.getStore('favoritesstore'),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),
			checked = "resources/images/iconmonstr-star-filled.svg",
			unchecked = "resources/images/iconmonstr-star-unfilled.svg",
			mgiId = record.data.mgiId,
			controller = this,
			favesEditButton = this.getFavesEditButton(),
			mainView = Ext.Viewport.getComponent(0),
			faveSearchToolbar = this.getFaveSearchToolbar();

		// get a reference to the matching record in the favoritesStore
		var faveRecordPos = favoritesStore.find('mgiId', mgiId);
			faveRecord = favoritesStore.getAt(faveRecordPos);
		var faveUserLabel = faveRecord.data.user_label;
			faveNotes = faveRecord.data.notes,
			faveLabel = faveRecord.data.label;

		// remove the favorite unless the user has notes or labels associated
		// with this record in the favoritesStore, in which case display a confirmation dialog box  
		if (((faveUserLabel == 'Unlock to add labels') && (faveNotes == 'Unlock to edit notes'))
			|| ((faveUserLabel == '') && (faveNotes == ''))) {
			// set this record's icon back to unfilled-star
			// (need it to show up properly in FavesList)
			record.set('state', unchecked);

			// remove the record from the user's favorites
			favoritesStore.remove(faveRecord);
			favoritesStore.sync();
			favesListView.refresh();

			// display a confirmation notification
			var string = faveLabel + " removed from Favorites";
			Ext.Msg.alert('', string, Ext.emptyFn);

			// hide the trashSearchPanel
			popup.hide();

			favoritesStore.clearFilter(); 
			var numFaves = favoritesStore.getCount(); 
			if (numFaves == 0) { 
			favesEditButton.setText('Edit'); 
			favesEditButton.hide(); 
			faveSearchToolbar.hide(); 
			mainView.getTabBar().show(); 
			favesListView.refresh(); 
			} // end of if

			// set the favesdetail child panel to the top of the favespanel stack
			favesPanelView.animateActiveItem(favesListView, this.getSlideRightTransition()); 
		} else { 
			var string2 = faveLabel + " has notes/labels";
			Ext.Msg.confirm("Are you sure?", string2, function (button) {				
				if (button == 'yes') {

					// set this record's icon back to unfilled-star
					// (need it to show up properly in FavesList)
					record.set('state', unchecked);

					// remove the record from the user's favorites
					favoritesStore.remove(faveRecord);
					favoritesStore.sync();
					favesListView.refresh();

					// set the favesdetail child panel to the top of the favespanel stack
					favesPanelView.animateActiveItem(favesListView, this.getSlideRightTransition());
					
					// display a confirmation notification if necessary
					var string = faveLabel + " removed from Favorites";
					Ext.Msg.alert('', string, Ext.emptyFn);

					// hide the trashSearchPanel
					popup.hide();
					
					favoritesStore.clearFilter(); 
					var numFaves = favoritesStore.getCount(); 
					if (numFaves == 0) { 
					favesEditButton.setText('Edit'); 
					favesEditButton.hide(); 
					faveSearchToolbar.hide(); 
					mainView.getTabBar().show(); 
					favesListView.refresh(); 
					} // end of if

				} else {

					// reset the stars
					//allSearchResultsStore.each(function(record) {
						record.set('state', checked);
					//}, this);
					allSearchResultsStore.sync();

					// hide the trashSearchPanel
					popup.hide();

					return false;
				} // end of else
			}, this);
		} // end of else
	}, // end onRemoveFaveCommand
	
	onTrashSearchPanelConfirmButtonCommand: function() {
		this.onRemoveFaveCommand();
	}, // end onTrashSearchPanelConfirmButtonCommand

	onTrashSearchPanelCancelButtonCommand: function() {

		var popup = this.getTrashSearchPanelPopup(),
			record = popup.getRecord(),
			allSearchResultsStore = Ext.getStore('allsearchresults'),
			checked = "resources/images/iconmonstr-star-filled.svg";

		// reset the stars
		//allSearchResultsStore.each(function(record) {
			record.set('state', checked);
		//}, this);
		allSearchResultsStore.sync();

		// hide the trashSearchPanel
		popup.hide();
	} // end onTrashSearchPanelCancelButtonCommand
});

















