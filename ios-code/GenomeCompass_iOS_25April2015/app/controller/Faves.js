Ext.define('GenomeCompass.controller.Faves', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			// We're going to look up our views by alias.
			mainView: 'mainview',
			homeView: 'homeview',
			updatesListView: 'updateslistview',
			favesPanelView: 'favespanelview',
			favesListView: 'faveslistview',
			favesDetailView: 'favesdetailview',
			searchListView: 'searchlistview',
			trashPanel: 'trashpanel',
			trashDetailPanel: 'trashdetailpanel',

			// look up components by id
			faveSearchToolbar: '.faveslistview #faveSearchToolbar',
			favesEditTrashButton: '.faveslistview #favesEditTrashButton',
			favesEditButton: '.faveslistview #favesEditButton',
			favesDetailTitlebar: '.faveseditview #favesDetailTitlebar', // CHECK THIS OUT
			favesDetailEditSaveButton: '.favesdetailview #favesDetailEditSaveButton',
			favesDetailBackButton: '.favesdetailview #favesDetailBackButton',
			favesDetailDeleteToolbar: '.favesdetailview #favesDetailDeleteToolbar',
			favesDetailViewMgiButton: '.favesdetailview #favesDetailViewMgiButton',
			favesDetailSymbolField: '.favesdetailview #favesDetailSymbolField',
			favesDetailNameField: '.favesdetailview #favesDetailNameField',
			favesDetailTermField: '.favesdetailview #favesDetailTermField',
			favesDetailLocationField: '.favesdetailview #favesDetailLocationField',
			favesDetailIdField: '.favesdetailview #favesDetailIdField',
			favesDetailUserLabelField: '.favesdetailview #favesDetailUserLabelField',
			favesDetailNotesField: '.favesdetailview #favesDetailNotesField',			
			favesDetailNewRefToggle: '.favesdetailview #favesDetailNewRefToggle',
			favesDetailNewAlleleToggle: '.favesdetailview #favesDetailNewAlleleToggle',
			favesDetailNewPhenoAssocToggle: '.favesdetailview #favesDetailNewPhenoAssocToggle',
			favesDetailNewDiseaseAssocToggle: '.favesdetailview #favesDetailNewDiseaseAssocToggle',
			favesDetailNewGoTermsToggle: '.favesdetailview #favesDetailNewGoTermsToggle',
			favesDetailNomenChangeToggle: '.favesdetailview #favesDetailNomenChangeToggle',
			favesDetailNewGeneAssocToggle: '.favesdetailview #favesDetailNewGeneAssocToggle',
			favesDetailNewAlleleAssocToggle: '.favesdetailview #favesDetailNewAlleleAssocToggle',
			favesDetailNewGenotypeAssocToggle: '.favesdetailview #favesDetailNewGenotypeAssocToggle',
			trashPanelConfirmButton: '.trashpanel #trashPanelConfirmButton',
			trashPanelCancelButton: '.trashpanel #trashPanelCancelButton',
			trashDetailPanelConfirmButton: '.trashdetailpanel #trashDetailPanelConfirmButton',
			trashDetailPanelCancelButton: '.trashdetailpanel #trashDetailPanelCancelButton',			
			trashPanelPopup: {
				autoCreate: true,
				selector: '#trashPanel',
				xtype: 'trashpanel'
			},
			trashDetailPanelPopup: {
				autoCreate: true,
				selector: '#trashDetailPanel',
				xtype: 'trashdetailpanel'
			}
		},
		control: {
			// The commands fired by the favesEditButton in the FavesList view
			favesEditButton: {
				tap: 'onfavesEditCommand'
			},
			trashPanelConfirmButton: {
				tap: 'onTrashPanelConfirmButtonCommand'
			},
			trashPanelCancelButton: {
				tap: 'onTrashPanelCancelButtonCommand'
			},
			trashDetailPanelConfirmButton: {
				tap: 'onTrashDetailPanelConfirmButtonCommand'
			},
			trashDetailPanelCancelButton: {
				tap: 'onTrashDetailPanelCancelButtonCommand'
			},
			favesEditTrashButton: {
				tap: 'onShowTrashConfirmCommand'
			},

			// The commands fired by the faveslist view
			favesListView: {
				showFavesDetailCommand: 'onShowFavesDetailCommand',
				openFaveUrlCommand: 'onOpenFaveUrlCommand',
				checkNumFavesCommand: 'onCheckNumFavesCommand',
				changeTheBoxCommand: 'onChangeTheBoxCommand',
				assignFnCommand: 'onAssignFnCommand'
			},
			// The commands fired by the favesdetail view
			favesDetailView: {
				backToFavesListCommand: 'onBackToFavesListCommand',
				editSaveFavesDetailCommand: 'onEditSaveFavesDetailCommand',
				deleteFaveCommand: 'onDeleteFaveCommand',
				viewMgiCommand: 'onViewMgiCommand',
				showTrashConfirmCommand: 'onShowTrashConfirmCommand'
			},
			// The commands fired by the searchlist view
			searchListView: {
				checkNumFavesCommand: 'onCheckNumFavesCommand'
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

	// FavesListView Commands
	onCheckNumFavesCommand: function (view) {
		var favesListView = this.getFavesListView(),
			favoritesStore = Ext.getStore('favoritesstore'),
			numFaves = favoritesStore.getCount(),
			favesEditButton = this.getFavesEditButton(),
			faveSearchToolbar = this.getFaveSearchToolbar();

		if (numFaves == 0) { 
			favesEditButton.hide(); 
			faveSearchToolbar.hide();
		} else if (numFaves > 0) {
			favesEditButton.show(); 
			faveSearchToolbar.show();
		} // end of else if
		favesListView.refresh();
	},
	onShowFavesDetailCommand: function (list, record) {

		var mainView = Ext.Viewport.getComponent(0),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),	
			favesDetailView = this.getFavesDetailView(),
			favesDetailTitlebar = this.getFavesDetailTitlebar(),
			favesDetailSymbolField = this.getFavesDetailSymbolField(),
			favesDetailNameField = this.getFavesDetailNameField(),
			favesDetailTermField = this.getFavesDetailTermField(),
			favesDetailIdField = this.getFavesDetailIdField(),
			favesDetailLocationField = this.getFavesDetailLocationField(),
			favesDetailNewAlleleToggle = this.getFavesDetailNewAlleleToggle(),
			favesDetailNewPhenoAssocToggle = this.getFavesDetailNewPhenoAssocToggle(),
			favesDetailNewDiseaseAssocToggle = this.getFavesDetailNewDiseaseAssocToggle(),
			favesDetailNewGoTermsToggle = this.getFavesDetailNewGoTermsToggle(),
			favesDetailNomenChangeToggle = this.getFavesDetailNomenChangeToggle(),
			favesDetailNewGeneAssocToggle = this.getFavesDetailNewGeneAssocToggle(),
			favesDetailNewAlleleAssocToggle = this.getFavesDetailNewAlleleAssocToggle(),
			favesDetailNewGenotypeAssocToggle = this.getFavesDetailNewGenotypeAssocToggle(),
			type = record.data.type,
			label = record.data.label,
			title = label + " Detail";	

		// bind the clicked record's information to the detail view
		favesDetailView.setRecord(record);

		// load the annotation data fields
		// based on the type of record that was clicked
		// show the fields we need,
		// hide the fields we don't need,
		// and change the label on the ID field
		if (type == 'Gene') {
			favesDetailSymbolField.show();
			favesDetailNameField.show();
			favesDetailLocationField.show();
			favesDetailTermField.hide();
			favesDetailIdField.setLabel('MGI ID');
		} else if (type === "Phenotype") {
			favesDetailSymbolField.hide();
			favesDetailNameField.hide();
			favesDetailLocationField.hide();
			favesDetailTermField.show();
			favesDetailIdField.setLabel('MP ID');			
		} else if (type == 'Disease') {
			favesDetailSymbolField.hide();
			favesDetailNameField.hide();
			favesDetailLocationField.hide();
			favesDetailTermField.show();
			favesDetailIdField.setLabel('OMIM ID');				
		} // end of else if

		// load the notification preferences fields
		// based on the type of record that was clicked
		// show the fields we need and
		// hide the fields we don't need
		if (type == 'Gene') {
			favesDetailNewAlleleToggle.show();
			favesDetailNewPhenoAssocToggle.show();
			favesDetailNewDiseaseAssocToggle.show();
			favesDetailNewGoTermsToggle.show();
			favesDetailNomenChangeToggle.show();
			favesDetailNewGeneAssocToggle.hide();
			favesDetailNewAlleleAssocToggle.hide();
			favesDetailNewGenotypeAssocToggle.hide();
		} else if (type === "Phenotype") {
			favesDetailNewAlleleToggle.hide();
			favesDetailNewPhenoAssocToggle.hide();
			favesDetailNewDiseaseAssocToggle.hide();
			favesDetailNewGoTermsToggle.hide();
			favesDetailNomenChangeToggle.show();
			favesDetailNewGeneAssocToggle.show();
			favesDetailNewAlleleAssocToggle.show();
			favesDetailNewGenotypeAssocToggle.show();
		} else if (type == 'Disease') {
			favesDetailNewAlleleToggle.hide();
			favesDetailNewPhenoAssocToggle.hide();
			favesDetailNewDiseaseAssocToggle.hide();
			favesDetailNewGoTermsToggle.hide();
			favesDetailNomenChangeToggle.show();
			favesDetailNewGeneAssocToggle.show();
			favesDetailNewAlleleAssocToggle.show();
			favesDetailNewGenotypeAssocToggle.show();
		} // end of else if

		// set the favesdetail child panel to the top of the favespanel stack
		favesPanelView.animateActiveItem(favesDetailView, this.getSlideLeftTransition()); // what other kinds of transitions are there?
	},
	onEditSaveFavesDetailCommand: function (list, record) {

		var mainView = this.getMainView(),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),	
			favesDetailView = this.getFavesDetailView(),
			currentFave = favesDetailView.getRecord(),
			favoritesStore = Ext.getStore('favoritesstore'),
			favesDetailEditSaveButton = this.getFavesDetailEditSaveButton(),
			favesDetailBackButton = this.getFavesDetailBackButton(),
			buttonIconCls = favesDetailEditSaveButton.getIconCls(),
			//wp buttonText = favesDetailEditSaveButton.getText(),
			favesDetailDeleteToolbar = this.getFavesDetailDeleteToolbar(),
			favesDetailUserLabelField = this.getFavesDetailUserLabelField(),
			favesDetailNotesField = this.getFavesDetailNotesField(),
			favesDetailNewRefToggle = this.getFavesDetailNewRefToggle(),
			favesDetailNewAlleleToggle = this.getFavesDetailNewAlleleToggle(),
			favesDetailNewPhenoAssocToggle = this.getFavesDetailNewPhenoAssocToggle(),
			favesDetailNewDiseaseAssocToggle = this.getFavesDetailNewDiseaseAssocToggle(),
			favesDetailNewGoTermsToggle = this.getFavesDetailNewGoTermsToggle(),
			favesDetailNomenChangeToggle = this.getFavesDetailNomenChangeToggle(),
			favesDetailNewGeneAssocToggle = this.getFavesDetailNewGeneAssocToggle(),
			favesDetailNewAlleleAssocToggle = this.getFavesDetailNewAlleleAssocToggle(),
			favesDetailNewGenotypeAssocToggle = this.getFavesDetailNewGenotypeAssocToggle();

		// figure out if the user clicked "Edit" or "Save"
		//if (buttonText == 'Unlock') {
		if (buttonIconCls == 'lock') {
			// change the text of the EditSave button
			//wp favesDetailEditSaveButton.setText('Lock');
			favesDetailEditSaveButton.setIconCls('unlock');

			// show the delete button toolbar
			favesDetailDeleteToolbar.show();

			// hide the tabbar so the favesedit child panel "covers" it
			mainView.getTabBar().hide();			

			// enable the fields on the form
			favesDetailUserLabelField.enable();
			favesDetailNotesField.enable();
			favesDetailNewRefToggle.enable();
			favesDetailNewAlleleToggle.enable();
			favesDetailNewPhenoAssocToggle.enable();
			favesDetailNewDiseaseAssocToggle.enable();
			favesDetailNewGoTermsToggle.enable();
			favesDetailNomenChangeToggle.enable();
			favesDetailNewGeneAssocToggle.enable();
			favesDetailNewAlleleAssocToggle.enable();
			favesDetailNewGenotypeAssocToggle.enable();
		//wp } else if (buttonText == 'Lock') {
		} else if (buttonIconCls == 'unlock') {
			// hide the delete button toolbar
			favesDetailDeleteToolbar.hide();

			// show the main tabbar
			mainView.getTabBar().show();

			// Update the current favorite's fields with form values
			var newValues = favesDetailView.getValues();
			currentFave.set('user_label', newValues.user_label);
			currentFave.set('notes', newValues.notes);
			currentFave.set('pref_newRef', newValues.pref_newRef);
			currentFave.set('pref_newAllele', newValues.pref_newAllele);		
			currentFave.set('pref_newPhenoAssoc', newValues.pref_newPhenoAssoc);				
			currentFave.set('pref_newDiseaseAssoc', newValues.pref_newDiseaseAssoc);						
			currentFave.set('pref_newGoTerm', newValues.pref_newGoTerm);				
			currentFave.set('pref_nomenChange', newValues.pref_nomenChange);						
			currentFave.set('pref_newGeneAssoc', newValues.pref_newGeneAssoc);						
			currentFave.set('pref_newAlleleAssoc', newValues.pref_newAlleleAssoc);						
			currentFave.set('pref_newGenotypeAssoc', newValues.pref_newGenotypeAssoc);															
	
			// sync the store	
			favoritesStore.sync();

			// change the text of the EditSave and Cancel buttons back
			//wp favesDetailEditSaveButton.setText('Unlock');
			favesDetailEditSaveButton.setIconCls('lock');

			// set everything back to being disabled
			favesDetailUserLabelField.disable();
			favesDetailNotesField.disable();
			favesDetailNewRefToggle.disable();
			favesDetailNewAlleleToggle.disable();
			favesDetailNewPhenoAssocToggle.disable();
			favesDetailNewDiseaseAssocToggle.disable();
			favesDetailNewGoTermsToggle.disable();
			favesDetailNomenChangeToggle.disable();
			favesDetailNewGeneAssocToggle.disable();
			favesDetailNewAlleleAssocToggle.disable();
			favesDetailNewGenotypeAssocToggle.disable();	
		} // end of else
	},
	onfavesEditCommand: function () {

		var mainView = Ext.Viewport.getComponent(0),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),	
			favesEditButton = this.getFavesEditButton(),
			buttonText = favesEditButton.getText(),
			checked = "resources/images/iconmonstr-star-filled.svg",
			unchecked = "resources/images/iconmonstr-star-unfilled.svg",
			favoritesStore = Ext.getStore('favoritesstore');

		// figure out if the user clicked "Edit" or "Lock"
		if (buttonText == 'Edit') {

			// change the text of the Edit button
			favesEditButton.setText('Done');

			// hide the main tabbar
			mainView.getTabBar().hide();
		
		} else if (buttonText == 'Done') {

			// set the text on the favesEditButton
			favesEditButton.setText('Edit');

			// show the main tabbar
			mainView.getTabBar().show();
			
			// if the user deselected any stars..
			var allChecked = true;
			favoritesStore.each(function(record) {
				record.set('state', checked); 
			}, this);
		} // end of else if	
	}, 
		onBackToFavesListCommand: function () {

		var mainView = Ext.Viewport.getComponent(0),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),	
			favesDetailEditSaveButton = this.getFavesDetailEditSaveButton(),
			favesDetailBackButton = this.getFavesDetailBackButton(),
			favesDetailDeleteToolbar = this.getFavesDetailDeleteToolbar(),
			favesDetailUserLabelField = this.getFavesDetailUserLabelField(),
			favesDetailNotesField = this.getFavesDetailNotesField(),
			favesDetailNewRefToggle = this.getFavesDetailNewRefToggle(),
			favesDetailNewAlleleToggle = this.getFavesDetailNewAlleleToggle(),
			favesDetailNewDiseaseAssocToggle = this.getFavesDetailNewDiseaseAssocToggle(),
			favesDetailNewPhenoAssocToggle = this.getFavesDetailNewPhenoAssocToggle(),
			favesDetailNewGoTermsToggle = this.getFavesDetailNewGoTermsToggle(),
			favesDetailNewGeneAssocToggle = this.getFavesDetailNewGeneAssocToggle(),
			favesDetailNewAlleleAssocToggle = this.getFavesDetailNewAlleleAssocToggle(),
			favesDetailNewGenotypeAssocToggle = this.getFavesDetailNewGenotypeAssocToggle(),
			favesDetailNomenChangeToggle = this.getFavesDetailNomenChangeToggle();			
		
		// change the text of the EditSave button
		//wp favesDetailEditSaveButton.setText('Unlock');
		favesDetailEditSaveButton.setIconCls('lock');

		// hide the delete button toolbar
		favesDetailDeleteToolbar.hide();

		// set everything back to being disabled
		favesDetailUserLabelField.disable();
		favesDetailNotesField.disable();
		favesDetailNewRefToggle.disable();
		favesDetailNewAlleleToggle.disable();
		favesDetailNewPhenoAssocToggle.disable();
		favesDetailNewDiseaseAssocToggle.disable();
		favesDetailNewGoTermsToggle.disable();
		favesDetailNewGeneAssocToggle.disable();
		favesDetailNewAlleleAssocToggle.disable();
		favesDetailNewGenotypeAssocToggle.disable();
		favesDetailNomenChangeToggle.disable();

		// set the faveslist child panel to the top of the favespanel stack
		favesPanelView.animateActiveItem(favesListView, this.getSlideRightTransition()); // what other kinds of transitions are there?

		// show the tabbar so the favesedit child panel "covers" it
		mainView.getTabBar().show();		
	},
	onDeleteFaveCommand: function () {

		var mainView = Ext.Viewport.getComponent(0),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),
			favesDetailView = this.getFavesDetailView(),
			favoritesStore = Ext.getStore('favoritesstore'),
			favesEditButton = this.getFavesEditButton(),
			favesDetailEditSaveButton = this.getFavesDetailEditSaveButton(),
			favesDetailDeleteToolbar = this.getFavesDetailDeleteToolbar(),
			faveSearchToolbar = this.getFaveSearchToolbar(),
			currentFave = favesDetailView.getRecord(),
			trashDetailPanelPopup = this.getTrashDetailPanelPopup(),
			success = "resources/images/iconmonstr-star-unfilled.svg",
			controller = this;

		// set this record's icon back to unfilled-star
		// (need it to show up properly in FavesList)
		currentFave.set('state', success);

		// remove the record from the user's favorites
		// and bring them back to the FavesList view
		favoritesStore.remove(currentFave);
		favoritesStore.sync();

		trashDetailPanelPopup.hide();

		favesDetailEditSaveButton.setIconCls('lock');
		favesDetailDeleteToolbar.hide();
		mainView.getTabBar().show();

		favesListView.refresh();
		favesPanelView.animateActiveItem(favesListView, controller.getSlideRightTransition());

		// if there are no records left in the store,
		// bring the user back to the favesList view,
		// hide the edit button and search toolbar,
		// and show the tabbar on the mainView
		// remove the filter first so we have an accurate count
		favoritesStore.clearFilter();
		var numFaves = favoritesStore.getCount();
		if (numFaves == 0) { 
			favesEditButton.hide(); 
			faveSearchToolbar.hide();
			mainView.getTabBar().show();
			favesPanelView.animateActiveItem(favesListView, controller.getSlideDownTransition());
		} // end of if
	},
	onViewMgiCommand: function () {

		// get a reference to the record of the FavesDetailView
		var favesDetailView = this.getFavesDetailView(),
			record = favesDetailView.getRecord();

		// open a web browser and display the item's detail page
		var url = record.data.url;
		var ref = window.open(url, '_system', 'location=yes', 'closebuttoncaption=Done');

	},
	onChangeTheBoxCommand: function (list, record) {

		var mainView = Ext.Viewport.getComponent(0),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),
			faveSearchToolbar = this.getFaveSearchToolbar(),
			favesEditButton = this.getFavesEditButton(),
			favoritesStore = Ext.getStore('favoritesstore'),
			state = record.data.state,
			checked = "resources/images/iconmonstr-star-filled.svg",
			unchecked = "resources/images/iconmonstr-star-unfilled.svg",
			controller = this;

		// change the state to the opposite of whatever it was
		// ** eventually change this so the state is checked or unchecked
		// ** and the store converts the state to the url returned to the view
		if (state == checked) {		
			record.set('state', unchecked);
			this.onShowTrashConfirmCommand('favesChangebox', record);
		} else if (state == unchecked) { 
			record.set('state', checked); 
		} // end of else if

		// sync the store
		favoritesStore.sync();
	},
	onShowTrashConfirmCommand: function(origin, record) {

		// make sure the user selected at least one favorite to trash
		var favesDetailView = this.getFavesDetailView(),
			favoritesStore = Ext.getStore('favoritesstore'),
			unchecked = "resources/images/iconmonstr-star-unfilled.svg",
			popup = this.getTrashPanelPopup(),
			trashPanelConfirmButton = this.getTrashPanelConfirmButton();

		// get the record the user wants to remove
		if (origin == 'favesChangebox') { // ultimately coming from FavesList.js
			record = record;
			trashPanelConfirmButton.setText("Remove Unstarred");
		} else if (origin == 'favesdetail') {  // called by favesDetailDeleteButton)
			record = favesDetailView.getRecord();
			trashPanelConfirmButton.setText("Remove Favorite");
		} // end of else

		// bind the record to the popup
		popup.setRecord(record);

		// show the trashPanelDetailPopup
		Ext.Viewport.add(popup);
		popup.show(this.getSlideUpTransition());
	},
	onTrashPanelConfirmButtonCommand: function() {

		var favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),
			favesDetailEditSaveButton = this.getFavesDetailEditSaveButton(),
			favoritesStore = Ext.getStore('favoritesstore'),
			favesEditButton = this.getFavesEditButton(),
			buttonText = favesEditButton.getText;
			popup = this.getTrashPanelPopup(),
			record = popup.getRecord(),     //.getRecord(),
			unchecked = "resources/images/iconmonstr-star-unfilled.svg",
			checked = "resources/images/iconmonstr-star-filled.svg",
			favesEditButton = this.getFavesEditButton(),
			buttonText = favesEditButton.getText(),
			mainView = Ext.Viewport.getComponent(0),
			favesPanelView = this.getFavesPanelView(),
			favesListView = this.getFavesListView(),
			faveSearchToolbar = this.getFaveSearchToolbar(),
			controller = this;

		var faveUserLabel = record.data.user_label,
			faveNotes = record.data.notes,
			faveLabel = record.data.label;

		// remove the favorite unless the user has notes or labels associated
		// with this record in the favoritesStore, in which case display a confirmation dialog box  
		if (((faveUserLabel == 'Unlock to add labels') && (faveNotes == 'Unlock to edit notes'))
			|| ((faveUserLabel == '') && (faveNotes == ''))) {
			// set this record's icon back to unfilled-star
			// (need it to show up properly in FavesList)
			record.set('state', unchecked);

			// remove the record from the user's favorites
			favoritesStore.remove(record);
			favoritesStore.sync();
			favesListView.refresh();

			// display a confirmation notification
			var string = faveLabel + " removed from Favorites";
			Ext.Msg.alert('', string, Ext.emptyFn);

			// hide the trashSearchPanel
			popup.hide();

			// if there are no records left in the store,
			// bring the user back to the favesList view,
			// hide the edit button and search toolbar,
			// and show the tabbar on the mainView
			// remove the filter first so we have an accurate count
			favoritesStore.clearFilter();
			var numFaves = favoritesStore.getCount();
			if (numFaves == 0) {
			favesEditButton.setText('Edit');
			favesEditButton.hide(); 
			faveSearchToolbar.hide();
			mainView.getTabBar().show();
			favesPanelView.animateActiveItem(favesListView, controller.getSlideDownTransition());
			} // end of if

			if (buttonText == 'Edit') { // we're deleting from the Detail Card page
			this.onBackToFavesListCommand();
			} // end of if

		} else { 
			var string2 = faveLabel + " has notes/labels",
				controller = this;

			Ext.Msg.confirm("Are you sure?", string2, function (button) {				
				if (button == 'yes') {

					// set this record's icon back to unfilled-star
					// (need it to show up properly in FavesList)
					record.set('state', unchecked);

					// remove the record from the user's favorites
					favoritesStore.remove(record);
					favoritesStore.sync();
					favesListView.refresh();
					
					// display a confirmation notification if necessary
					var string = faveLabel + " removed from Favorites";
					Ext.Msg.alert('', string, Ext.emptyFn);

					// hide the trashSearchPanel
					popup.hide();

					// if there are no records left in the store,
					// bring the user back to the favesList view,
					// hide the edit button and search toolbar,
					// and show the tabbar on the mainView
					// remove the filter first so we have an accurate count
					favoritesStore.clearFilter();
					var numFaves = favoritesStore.getCount();
					if (numFaves == 0) {
					favesEditButton.setText('Edit');
					favesEditButton.hide(); 
					faveSearchToolbar.hide();
					mainView.getTabBar().show();
					favesPanelView.animateActiveItem(favesListView, controller.getSlideDownTransition());
					} // end of if

					if (buttonText == 'Edit') { // we're deleting from the Detail Card page
					this.onBackToFavesListCommand();
					} // end of if
					
				} else {

					// reset the star
					record.set('state', checked);
					favoritesStore.sync();
					favesListView.refresh();					

					// hide the trashSearchPanel
					popup.hide();

					return false;
				} // end of else
			}, this);
		} // end of else
	},
	onTrashPanelCancelButtonCommand: function() {
		//var trashPanelPopup = this.getTrashPanelPopup(),
		var popup = this.getTrashPanelPopup(),
			record = popup.getRecord(),
			favoritesStore = Ext.getStore('favoritesstore'),
			checked = "resources/images/iconmonstr-star-filled.svg";

		// reset the stars
		record.set('state', checked);
		favoritesStore.sync();

		// hide the trashPanelPopup
		popup.hide();
	},
	onTrashDetailPanelConfirmButtonCommand: function() {
		// delete the item from the user's favorite's list
		this.onDeleteFaveCommand();
	},
	onTrashDetailPanelCancelButtonCommand: function() {
		var trashDetailPanelPopup = this.getTrashDetailPanelPopup();

		// hide the trashPanelPopup
		trashDetailPanelPopup.hide();
	},
	onAssignFnCommand: function(view, record) {
		var view = view,
			record = record,
			favesEditButton = this.getFavesEditButton(),
			buttonText = favesEditButton.getText(),
			controller = this;

		// figure out what function to call based on
		// the status of the favesEditButton text
		if (buttonText == 'Edit') {
			controller.onShowFavesDetailCommand(view, record);
		} else if (buttonText == 'Done') {
			controller.onChangeTheBoxCommand(view, record);
		} // end of else if
	},
	onOpenFaveUrlCommand: function(list, record) {
		// open a web browser and display the item's detail page
		var url = record.data.url;
		var ref = window.open(url, '_system', 'location=yes', 'closebuttoncaption=Done');
	},
	// Base class methods.
	launch: function () {
		this.callParent(arguments);
	}, // launch
	init: function () {
		this.callParent(arguments);
	} // init
});