Ext.define('GenomeCompass.controller.Main', {
	extend: 'Ext.app.Controller',
		requires: [
		'Ext.device.Connection'	,
		'Ext.device.Communicator',
		'Ext.device.connection.Cordova',
		'Ext.device.connection.Sencha',
		'Ext.device.connection.Simulator'
	],
	config: {
		refs: {
			mainView: 'mainview',
			updatesListView: 'updateslistview',
			updatesListEditPanelView: 'updateslisteditpanelview',
			updatesRefreshButton: '.updateslisteditpanelview #updatesRefreshButton',
			updatesGroupByButton: '.updateslisteditpanelview #updatesGroupByButton',
			updatesSearchToolbar: '.updateslisteditpanelview #updatesSearchToolbar'
		},
		control: {
			mainView: {
				setDateLastSyncCommand: 'onSetDateLastSyncCommand',
				loadUpdatesCommand: 'onLoadUpdatesCommand',
				showWelcomeCommand: 'onShowWelcomeCommand'
			},
			updatesListView: {
				setDateLastSyncCommand: 'onSetDateLastSyncCommand'
			},
			updatesRefreshButton: {
				tap: 'onLoadUpdatesCommand'
			},
			"tabpanel #ext-tab-1": {
				tap: 'onUpdatesTap'
			}
		} // end of control
	},

	onShowWelcomeCommand: function() {

		var mainView = Ext.Viewport.getComponent(0),
			welcomeScreen = Ext.create('GenomeCompass.view.Welcome');

		Ext.Viewport.add(welcomeScreen);

		// hide the tabbar and show the welcome screen		
		mainView.getTabBar().hide();
		welcomeScreen.show();
	},
	onUpdatesTap: function() {	
	
		var mainView = Ext.Viewport.getComponent(0),
			settingsStore = Ext.getStore('settingsstore'),
			numSettingsRecords = settingsStore.getCount();

		// reset the new_updates_counter
		if (numSettingsRecords == 0) { 

			var settingsRecordData = Ext.create('GenomeCompass.model.Settings', {
				date_last_sync: null,
				new_updates_counter: 0
			});
			var settingsNewRecord = settingsStore.add(settingsRecordData);

			Ext.each(settingsNewRecord, function(record) {
				record.phantom = true;
			});
							
			settingsStore.sync();
		} else if (numSettingsRecords > 0) {

			// get the record in the store and update it
			var record = settingsStore.getAt(0);
			record.set('new_updates_counter', 0);
			settingsStore.sync();
		} // end of else if

		// reset the badge text
		mainView.getTabBar().getComponent(0).setBadgeText('');
	},
	onSetDateLastSyncCommand: function() {

		var settingsStore = Ext.getStore('settingsstore'),
			numSettingsRecords = settingsStore.getCount(),
			now = new Date(),
			format = 'D M j, Y',
			formatted = Ext.Date.format(now,format);

		// every time the app is loaded, we need to sync
		// so when this main view is initialized, set the dateLastSync
		// to whatever today is

		// see if the settingsStore is empty
		// if it is, create a new settings model and add it to the store
		// if it isn't, update the date of the model instance in the store		
		if (numSettingsRecords == 0) { 

			var settingsRecordData = Ext.create('GenomeCompass.model.Settings', {
				date_last_sync: now,
				new_updates_counter: 0,
				show_welcome: '1'
			});
			var settingsNewRecord = settingsStore.add(settingsRecordData);

			Ext.each(settingsNewRecord, function(record) {
				record.phantom = true;
			});
							
			settingsStore.sync();
		} else if (numSettingsRecords > 0) {

			// get the record in the store and update it
			var record = settingsStore.getAt(0);
			record.set('date_last_sync', now);
			settingsStore.sync();
		} // end of else if
	}, 
	onLoadUpdatesCommand: function() {	

		var mainView = Ext.Viewport.getComponent(0),
			updatesListEditPanelView = this.getUpdatesListEditPanelView(),
			updatesListView = this.getUpdatesListView(),
			settingsStore = Ext.getStore('settingsstore'),
			settingsRecord = settingsStore.getAt(0),
			date_last_sync = settingsRecord.data.date_last_sync,
			favoritesStore = Ext.getStore('favoritesstore'),
			geneUpdateResultsStore = Ext.getStore('geneupdateresults'),
			phenoUpdateResultsStore = Ext.getStore('phenoupdateresults'),
			diseaseUpdateResultsStore = Ext.getStore('diseaseupdateresults'),
			allUpdateResultsStore = Ext.getStore('allupdateresults'),
			updatesGroupByButton = this.getUpdatesGroupByButton(),
			updatesSearchToolbar = this.getUpdatesSearchToolbar(),
			controller = this,
			mgiId = '',
			type = '',
			pref_newRef = '',
			pref_newAllele = '',
			pref_newPhenoAssoc = '',
			pref_newDiseaseAssoc = '',
			pref_newGoTerm = '',
			pref_nomenChange = '',
			pref_newGeneAssoc = '',
			pref_newAlleleAssoc = '',
			pref_newGenotypeAssoc = '',
			geneSubArray = [],
			diseaseSubArray = [],
			phenoSubArray = [],
			faveData = [],
			stringFaveData = [];

		// format the date_last_sync that came out of the settingsstore
		var format = 'D M j, Y';
		var	formatted = Ext.Date.format(date_last_sync, format);

		// see if the user has any favorties
		// if not, no need to do the sync		
		if ((favoritesStore.getCount()) == 0 && (allUpdateResultsStore.getCount() == 0)) {
			Ext.Msg.alert('Add some Favorites first!');
		//	updatesListEditPanelView.unmask();
			return;
		} // end of if

		// the user must have some favorites, so do the sync
		updatesListEditPanelView.setMasked({
			xtype: 'loadmask'
		});

		// build the JSON object to send to the updates script
		var favesArray = [];
		favoritesStore.each(function(record){

			// define/clear out the local variables
			var prefs = [],
				prefArray = [],
				data = [],
				dataArray = [];

			// build the prefArray
			prefs = {
    	        pref_newRef: record.data.pref_newRef,
				pref_newAllele: record.data.pref_newAllele,
				pref_newPhenoAssoc: record.data.pref_newPhenoAssoc,
				pref_newDiseaseAssoc: record.data.pref_newDiseaseAssoc,
				pref_newGoTerm: record.data.pref_newGoTerm,
				pref_nomenChange: record.data.pref_nomenChange,
				pref_newGeneAssoc: record.data.pref_newGeneAssoc,
				pref_newAlleleAssoc: record.data.pref_newAlleleAssoc,
				pref_newGenotypeAssoc: record.data.pref_newGenotypeAssoc
        	}; // prefs
	        prefArray[0] = prefs;

    	    // build the dataArray
        	data = {
        		id: record.data.mgiId,
	        	prefs: prefArray
    	    }; // dataArray
        	dataArray[0] = data;

	        // push the dataArray onto a stack to encode as Faves later
    	    favesArray.push(dataArray);
		}); // end of each loop

		// encode the faveData array
		// (otherwise the data will be compressed into one big array and we'll lose the item sub-arrays)
		var stringFaveData = Ext.encode({faves: favesArray});

		// make the JSONP call to the backend server
		Ext.data.JsonP.request({
			url: 'http://proto.informatics.jax.org/prototypes/iphone_app/cgi/getUpdates.php',
			callbackKey: 'callback',     // the callbackKey is used for JSONP requests
			withCredentials: true,       // JSONP things
			useDefaultXhrHeader: false,  // JSONP things
			timeout: 40000000,			 // exceedingly huge so it doesn't time out

			// now we define the params to be sent to the server
			params: {
				faveData: stringFaveData,
				format: 'json'
			},

			success: function(rtndata) {

				var gene_results = rtndata.gene_results,
					pheno_results = rtndata.pheno_results,
					disease_results = rtndata.disease_results;

				if ((! gene_results) || (! pheno_results) || (! disease_results)) {

					// unmask the updatesListEditPanelView and display an error
					updatesListEditPanelView.unmask();
					Ext.Msg.alert('', 'Server error', Ext.emptyFn);					
				} // end of if

				else {
					// get counts for gene, phenotype, and disease results
					var numGenes = gene_results.length,
						numPhenos = pheno_results.length,
						numDiseases = disease_results.length,
						numTotal = numGenes + numPhenos + numDiseases,
						controller = this;		

					// remove updates from the store that no longer match current favorites
					var toRemove = 0;
					allUpdateResultsStore.each(function(record) {

						// define the favoritesStore
						var favoritesStore = Ext.getStore('favoritesstore');

						// get the id of the item in the updateStore
						var updateId = record.data.mgiId;

						// see if this item is in the favoritesStore
						var faveRecord = favoritesStore.findRecord('mgiId', updateId);
				
						// if the ID is not found in the favoritesStore..
						if (faveRecord == null) {

							// get the read/unread status of this update record
							var status = record.data.status;

							if (status == 'unread') { toRemove ++; }

							// remove the update from the updatesStore
							allUpdateResultsStore.remove(record); 
						} // end of if
					});
						
					// sync the store
					allUpdateResultsStore.sync();

					// update the new_updates_counter
					var new_updates_counter = settingsRecord.data.new_updates_counter;
					new_updates_counter = new_updates_counter - toRemove;
					if (new_updates_counter < 0) { new_updates_counter = 0; }
					settingsRecord.set('new_updates_counter', new_updates_counter);
					mainView.getTabBar().getComponent(0).setBadgeText(new_updates_counter);	
			
					// if the sync returned no updates
					if ((numGenes == 0) && (numPhenos == 0) && (numDiseases == 0)) {

						// alert the user
						Ext.Msg.alert('', 'No updates within last 30 days', Ext.emptyFn);	
					} // end of if

					// otherwise, if there are results, store and display them
					else {

						var	numUpdates = allUpdateResultsStore.getCount() + numTotal;

						if (numUpdates > 0) {
							updatesGroupByButton.show(); 
							updatesSearchToolbar.show();
						} // end of else if

					
						//** Gene results **//

						// clear out the geneUpdateResultsStore
						geneUpdateResultsStore.removeAll();
						geneUpdateResultsStore.sync();		

						// set the gene_label and gene_group_index variables
						var gene_label = "",
							gene_index = 0;

						for (var i=0; i < numGenes; i++) { // get the gene updates

							// first take care of other things
							var old_gene_label = gene_label;

							// now set the variables for this item in the array
							var gene_subArray = gene_results[i],
								gene_id = gene_subArray["id"],
								gene_type = gene_subArray["type"],
								gene_label = gene_subArray["label"],
								gene_update = gene_subArray["update"],
								gene_link = gene_subArray["link"],
								gene_pubdate = gene_subArray["pubdate"];

							// find the largest group_index in the allUpdateResultsStore
							// and set the gene_group_index to one larger
							if (allUpdateResultsStore.getCount() > 0) {
								var largestGroupIndex = allUpdateResultsStore.getAt(0).get('group_index'); // initialise to the first record's id value.
								allUpdateResultsStore.each(function(record) { // go through all the records
									largestGroupIndex = Math.max(largestGroupIndex, record.get('group_index'));
								});
								var gene_group_index = largestGroupIndex;
							} // end of if
							else { gene_group_index = -1; }

							// set the index and gene_group_index appropriately
							if (gene_label == old_gene_label) { 
								gene_group_index = gene_group_index;
								gene_index = gene_index + 1;
							} else { 
								gene_group_index = gene_group_index + 1;
								gene_index = 0;
							} // end of else

							// see if this update is already in the allUpdateResultsStore
							var addGeneUpdate = false;
							var find = allUpdateResultsStore.find('mgiId', gene_id);
							if (find != -1) { // update with MGI ID is in store
								var find2 = allUpdateResultsStore.find('update', gene_update);
								if (find2 != -1) { // update with this update text is in store
									var find3 = allUpdateResultsStore.find('pubdate', gene_pubdate);
									if (find3 != -1) { // update with this pubdate is in store
										// this update is already in the allUpdateResultsStore
										// ignore it
									} // end of if
								}
								else { addGeneUpdate = true; }
							} // end of if
							else { addGeneUpdate = true; }

							if (addGeneUpdate == true) { // this update isn't in the store yet

								// add the data to the geneUpdatesResults store
								var geneRecordData = Ext.create('GenomeCompass.model.UpdateResult', {
									mgiId: gene_id,
									type: gene_type,
									label: gene_label,
									group_index: gene_group_index,
									update: gene_update,
									link: gene_link,
									pubdate: gene_pubdate,
									index: gene_index
								});

								var geneNewRecord = geneUpdateResultsStore.add(geneRecordData);

								Ext.each(geneNewRecord, function(record) {
									record.phantom = true;
								});
							
								geneUpdateResultsStore.sync();

								// increase the counter
								var new_updates_counter = settingsRecord.data.new_updates_counter,
									newVal = new_updates_counter + 1;
								settingsRecord.set('new_updates_counter', newVal);

								// see if this update requires changes to 
								// the nomenclature of the associated favorite
								var myregex = /changed to "([^"]*)"/;
								var matchArray = myregex.exec(gene_update);
								if (matchArray != null) {
								    var new_nomen = matchArray[1];

								    // update the this phenotype's nomenclature in the favorites store
								    var favoritesStore = Ext.getStore('favoritesstore');
								    var record = favoritesStore.findRecord('mgiId', gene_id);
				
									// if the record is found in the store
									// (it should be),
									// update the record's term with the new nomenclature
									if (record != -1) {	record.set('name', new_nomen); }
									else { Ext.Msg.alert('', 'Nomenclature update failed', Ext.emptyFn); }
									favoritesStore.sync();
								} // end of if
							} // end of if

						} // end of for loop


						//** Phenotype results **//

						// clear out the phenoUpdateResults store
						phenoUpdateResultsStore.removeAll();
						phenoUpdateResultsStore.sync();

						// set the gene_label and gene_group_index variables
						var pheno_label = "",
							pheno_index = 0;


						for (var i=0; i < numPhenos; i++) { // get the phenotype updates

							// first take care of other things
							var old_pheno_label = pheno_label;

							// now set the variables for this item in the array
							var pheno_subArray = pheno_results[i],
								pheno_id = pheno_subArray["id"],
								pheno_type = pheno_subArray["type"],
								pheno_label = pheno_subArray["label"],
								pheno_update = pheno_subArray["update"],
								pheno_link = pheno_subArray["link"],
								pheno_pubdate = pheno_subArray["pubdate"];

							// find the largest group_index in the allUpdateResultsStore
							// and set the pheno_group_index to one larger
							if (allUpdateResultsStore.getCount() > 0) {
								var largestGroupIndex = allUpdateResultsStore.getAt(0).get('group_index'); // initialize to the first record's id value.
								allUpdateResultsStore.each(function(record) { // go through all the records
									largestGroupIndex = Math.max(largestGroupIndex, record.get('group_index'));
								});
								var pheno_group_index = largestGroupIndex;
							} // end of if
							else { pheno_group_index = -1; }

							// set the index and pheno_group_index appropriately
							if (pheno_label == old_pheno_label) { 
								pheno_group_index = pheno_group_index;
								pheno_index = pheno_index + 1;
							} else { 
								pheno_group_index = pheno_group_index + 1;
								pheno_index = 0;
							} // end of else

							// see if this update is already in the allUpdateResultsStore
							var addPhenoUpdate = false;
							var find = allUpdateResultsStore.find('mgiId', pheno_id);
							if (find != -1) { // update with MGI ID is in store
								var find2 = allUpdateResultsStore.find('update', pheno_update);
								if (find2 != -1) { // update with this update text is in store
									var find3 = allUpdateResultsStore.find('pubdate', pheno_pubdate);
									if (find3 != -1) { // update with this pubdate is in store
										// ignore it
									} // end of if
								}
								else { addPhenoUpdate = true; }
							} // end of if
							else { addPhenoUpdate = true; }

							if (addPhenoUpdate == true) { // this update isn't in the store yet

								// add the data to the phenoUpdatesResults store
								var phenoRecordData = Ext.create('GenomeCompass.model.UpdateResult', {
									mgiId: pheno_id,
									type: pheno_type,
									label: pheno_label,
									group_index: pheno_group_index,
									update: pheno_update,
									link: pheno_link,
									pubdate: pheno_pubdate,
									index: pheno_index
								});

								var phenoNewRecord = phenoUpdateResultsStore.add(phenoRecordData);

								Ext.each(phenoNewRecord, function(record) {
									record.phantom = true;
								});
							
								phenoUpdateResultsStore.sync();

								// increase the counter
								var new_updates_counter = settingsRecord.data.new_updates_counter,
									newVal = new_updates_counter + 1;
								settingsRecord.set('new_updates_counter', newVal);

								// see if this update requires changes to 
								// the nomenclature of the associated favorite
								var myregex = /changed to "([^"]*)"/;
								var matchArray = myregex.exec(pheno_update);
								if (matchArray != null) {
								    var new_nomen = matchArray[1];

								    // update the this phenotype's nomenclature in the favorites store
								    var favoritesStore = Ext.getStore('favoritesstore');
								    var record = favoritesStore.findRecord('mgiId', pheno_id);
				
									// if the record is found in the store
									// (it should be),
									// update the record's term with the new nomenclature
									if (record != -1) {	record.set('term', new_nomen); }
									else { Ext.Msg.alert('', 'Nomenclature update failed', Ext.emptyFn); }
									favoritesStore.sync();
								} // end of if
							} // end of if

						} // end of for loop


						//** Disease results **//

						// clear out the diseaseUpdateResults store
						diseaseUpdateResultsStore.removeAll();
						diseaseUpdateResultsStore.sync();

						// set the disease_label and disease_group_index variables
						var disease_label = "",
							disease_index = 0;

						for (var i=0; i < numDiseases; i++) { // get the disease updates

							// first take care of other things
							var old_disease_label = disease_label;	

							// now set the variables for this item in the array
							var disease_subArray = disease_results[i],
								disease_id = disease_subArray["id"],
								disease_type = disease_subArray["type"],
								disease_label = disease_subArray["label"],
								disease_update = disease_subArray["update"],
								disease_link = disease_subArray["link"],
								disease_pubdate = disease_subArray["pubdate"];

							// find the largest disease_index in the allUpdateResultsStore
							// and set the disease_group_index to one larger
							if (allUpdateResultsStore.getCount() > 0) {
								var largestGroupIndex = allUpdateResultsStore.getAt(0).get('group_index'); // initialize to the first record's id value.
								allUpdateResultsStore.each(function(record) { // go through all the records
									largestGroupIndex = Math.max(largestGroupIndex, record.get('group_index'));
								});
								var disease_group_index = largestGroupIndex;
							} // end of if
							else { disease_group_index = -1; }

							// set the index and gene_group_index appropriately
							if (disease_label == old_disease_label) { 
								disease_group_index = disease_group_index;
								disease_index = disease_index + 1;
							} else { 
								disease_group_index = disease_group_index + 1;
								disease_index = 0;
							} // end of else

							// see if this update is already in the allUpdateResultsStore
							var addDiseaseUpdate = false;
							var find = allUpdateResultsStore.find('mgiId', disease_id);
							if (find != -1) { // update with MGI ID is in store
								var find2 = allUpdateResultsStore.find('update', disease_update);
								if (find2 != -1) { // update with this update text is in store
									var find3 = allUpdateResultsStore.find('pubdate', disease_pubdate);
									if (find3 != -1) { // update with this pubdate is in store
										// this update is already in the allUpdateResultsStore
										// ignore it
									} // end of if
								}
								else { addDiseaseUpdate = true; }
							} // end of if
							else { addDiseaseUpdate = true; }

							if (addDiseaseUpdate == true) { // this update isn't in the store yet

								// add the data to the diseaseUpdatesResults store
								var diseaseRecordData = Ext.create('GenomeCompass.model.UpdateResult', {
									mgiId: disease_id,
									type: disease_type,
									label: disease_label,
									group_index: disease_group_index,
									update: disease_update,
									link: disease_link,
									pubdate: disease_pubdate,
									index: disease_index
								});

								var diseaseNewRecord = diseaseUpdateResultsStore.add(diseaseRecordData);

								Ext.each(diseaseNewRecord, function(record) {
									record.phantom = true;
								});
								
								diseaseUpdateResultsStore.sync();

								// increase the counter
								var new_updates_counter = settingsRecord.data.new_updates_counter,
									newVal = new_updates_counter + 1;
								settingsRecord.set('new_updates_counter', newVal);

								// see if this update requires changes to 
								// the nomenclature of the associated favorite
								var myregex = /changed to "([^"]*)"/;
								var matchArray = myregex.exec(disease_update);
								if (matchArray != null) {
								    var new_nomen = matchArray[1];

								    // update this disease's nomenclature in the favorites store
								    var favoritesStore = Ext.getStore('favoritesstore');
								    var record = favoritesStore.findRecord('mgiId', disease_id);
				
									// if the record is found in the store
									// (it should be),
									// update the record's term with the new nomenclature
									if (record != -1) {	record.set('term', new_nomen); }
									else { Ext.Msg.alert('', 'Nomenclature update failed', Ext.emptyFn); }
									favoritesStore.sync();
								} // end of if

							} // end of if
							
						} // end of for loop


						//** Merge the three results stores **//

						// set the index to the largest index in the allUpdateResultsStore
						if (allUpdateResultsStore.getCount() > 0) {
							var largestIndex = allUpdateResultsStore.getAt(0).get('index'); // initialise to the first record's id value.
							allUpdateResultsStore.each(function(rec) { // go through all the records
								largestIndex = Math.max(largestIndex, rec.get('index'));
							});
						} // end of if
						else { var largestIndex = -1; }
						var index = largestIndex + 1;

						// calculate the number of updates since last Updates tab tap
						var numNewGeneUpdates = geneUpdateResultsStore.getCount(),
							numNewPhenoUpdates = phenoUpdateResultsStore.getCount(),
							numNewDiseaseUpdates = diseaseUpdateResultsStore.getCount(),
							totalNewUpdates = numNewGeneUpdates + numNewPhenoUpdates + numNewDiseaseUpdates;
						
						// add the gene_results store records
						geneUpdateResultsStore.each(function(record) {
							var geneRecordData = Ext.create('GenomeCompass.model.UpdateResult', {
								mgiId: record.data.mgiId,
								type: record.data.type,
								label: record.data.label,
								group_index: record.data.group_index,
								index: record.data.index,								
								update: record.data.update,
								link: record.data.link,
								pubdate: record.data.pubdate,								
								origin: 'gene_results',
								disp_filter: 'Genes',
								status: 'unread'
							});

							var allNewRecord = allUpdateResultsStore.add(geneRecordData);
							Ext.each(allNewRecord, function(record) {
								record.phantom = true;
							});
							allUpdateResultsStore.sync();
							index ++;
						});							
		
						// add the disease_results store records
						diseaseUpdateResultsStore.each(function(record) {
							var diseaseRecordData = Ext.create('GenomeCompass.model.UpdateResult', {
								mgiId: record.data.mgiId,
								type: record.data.type,
								label: record.data.label,
								update: record.data.update,
								link: record.data.link,
								pubdate: record.data.pubdate,								
								origin: 'disease_results',
								disp_filter: 'Diseases/Phenotypes',
								group_index: '2',
								index: index,
								status: 'unread'								
							});
							var allNewRecord = allUpdateResultsStore.add(diseaseRecordData);
							Ext.each(allNewRecord, function(record) {
								record.phantom = true;
							});
							allUpdateResultsStore.sync();
							index ++;
						});
						
						// add the pheno_results store records
						phenoUpdateResultsStore.each(function(record) {
							var phenoRecordData = Ext.create('GenomeCompass.model.UpdateResult', {
								mgiId: record.data.mgiId,
								type: record.data.type,
								label: record.data.label,
								update: record.data.update,
								link: record.data.link,
								pubdate: record.data.pubdate,								
								origin: 'pheno_results',
								disp_filter: 'Diseases/Phenotypes',
								group_index: '2',
								index: index,
								status: 'unread'								
							});
							var allNewRecord = allUpdateResultsStore.add(phenoRecordData);
							Ext.each(allNewRecord, function(record) {
								record.phantom = true;
							});
							allUpdateResultsStore.sync();
							index ++;
						});

						// update the badge text of the Updates tab badge	
						var new_updates_counter = settingsRecord.data.new_updates_counter;
						mainView.getTabBar().getComponent(0).setBadgeText(new_updates_counter);													
					} // end of else

				} // end of else

				// refresh the updatesListView and unmask the updatesListEditPanelView
				updatesListView.refresh();
				updatesListEditPanelView.unmask();
			},
			failure: function(response) {
				if (response.timeout) {
					Ext.Msg.alert('Timeout', "The server timed out :(");
				
				} else if (response.aborted) {
					Ext.Msg.alert('Aborted', "Looks like you aborted the request");
				
				} else if (!Ext.util.Connection.isOnline()){
					Ext.Msg.alert('No Internet Connectivity', 
							"This application requires an internect connection.  Please check your connection.");	
				} else {
					Ext.Msg.alert('Failed', "Main.js Something went wrong with your request: " + response);
				} // end of else if

				//unmask the page
				updatesListEditPanelView.unmask();

				return;
			}, // end of failure function
			callback: function(rtndata, options, success, response) { }
		});
	} // end onLoadUpdatesCommand
});