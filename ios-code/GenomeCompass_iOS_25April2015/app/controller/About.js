Ext.define('GenomeCompass.controller.About', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			mainView: 'mainview',
			welcomeView: 'welcomeview',
			aboutPanelView: 'aboutpanelview',
			aboutListView: 'aboutlistview',
			aboutDevInfoView: 'aboutdevinfoview',
			aboutWelcomeView: 'aboutwelcomeview',
			aboutHelpListView: 'abouthelplistview',
			aboutHelpSearchView: 'abouthelpsearchview',
			aboutHelpFavesView: 'abouthelpfavesview',			
			aboutHelpUpdatesView: 'abouthelpupdatesview',						
			aboutContactView: 'aboutcontactview',
			aboutHelpListBackButton: '.abouthelplistview #aboutHelpListBackButton'
		},
		control: {
			aboutListView: {
				displayAboutSubpageCommand: 'onDisplayAboutSubpageCommand'
			},
			aboutDevInfoView: {
				backToAboutListCommand: 'onBackToAboutListCommand'
			},
			aboutWelcomeView: {
				backToAboutListCommand: 'onBackToAboutListCommand'
			},
			aboutHelpListView: {
				displayHelpSubpageCommand: 'onDisplayHelpSubpageCommand'
			},
			aboutHelpSearchView: {
				backToHelpListCommand: 'onBackToHelpListCommand'
			},
			aboutHelpFavesView: {
				backToHelpListCommand: 'onBackToHelpListCommand'
			},
			aboutHelpUpdatesView: {
				backToHelpListCommand: 'onBackToHelpListCommand'
			},			
			aboutContactView: {
				backToAboutListCommand: 'onBackToAboutListCommand'
			},
			aboutHelpListBackButton: {
				backToAboutListCommand: 'onBackToAboutListCommand'
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

	onDisplayAboutSubpageCommand: function (list, index, target, record, event) {

		var mainView = Ext.Viewport.getComponent(0),
			welcomeScreen = this.getWelcomeView(),
			aboutPanelView = this.getAboutPanelView(),
			aboutDevInfoView = this.getAboutDevInfoView(),
			aboutWelcomeView = this.getAboutWelcomeView(),
			aboutHelpListView = this.getAboutHelpListView(),
			aboutContactView = this.getAboutContactView();

		// figure out which About link the user tapped and
		// set the appropriate child panel to the top of the aboutpanel stack		
		if (index == 0) { aboutPanelView.animateActiveItem(aboutHelpListView, this.getSlideLeftTransition()); }
		else if (index == 1) { aboutPanelView.animateActiveItem(aboutDevInfoView, this.getSlideLeftTransition()); }		
		else if (index == 2) { 

			// create a welcomeScreen instance if it doesn't exist
			// and add it to the viewport
			if (welcomeScreen == null) { 
				welcomeScreen = Ext.create('GenomeCompass.view.Welcome'); 
				Ext.Viewport.add(welcomeScreen);
			}
			mainView.getTabBar().hide();
			welcomeScreen.show();
		} // end of else if
		else if (index == 3) { aboutPanelView.animateActiveItem(aboutContactView, this.getSlideLeftTransition()); }			
	},
	onDisplayHelpSubpageCommand: function (list, index, target, record, event) {

		var mainView = Ext.Viewport.getComponent(0),
			aboutHelpPanelView = this.getAboutPanelView(),
			aboutHelpListView = this.getAboutHelpListView(),
			aboutHelpSearchView = this.getAboutHelpSearchView(),
			aboutHelpFavesView = this.getAboutHelpFavesView(),
			aboutHelpUpdatesView = this.getAboutHelpUpdatesView();

		// figure out which About link the user tapped and
		// set the appropriate child panel to the top of the aboutpanel stack		
		if (index == 0) { aboutHelpPanelView.animateActiveItem(aboutHelpSearchView, this.getSlideLeftTransition()); }
		else if (index == 1) { aboutHelpPanelView.animateActiveItem(aboutHelpFavesView, this.getSlideLeftTransition()); }
		else if (index == 2) { aboutHelpPanelView.animateActiveItem(aboutHelpUpdatesView, this.getSlideLeftTransition()); }
	},
	onBackToAboutListCommand: function() {

		var mainView = Ext.Viewport.getComponent(0),
			aboutPanelView = this.getAboutPanelView(),
			aboutListView = this.getAboutListView();

		// set the aboutlist child panel to the top of the aboutpanel stack
		aboutPanelView.animateActiveItem(aboutListView, this.getSlideRightTransition()); // what other kinds of transitions are there?
	},
	onBackToHelpListCommand: function() {

		var mainView = Ext.Viewport.getComponent(0),
			aboutHelpPanelView = this.getAboutPanelView(),
			aboutHelpListView = this.getAboutHelpListView();

		// set the aboutlist child panel to the top of the aboutpanel stack
		aboutHelpPanelView.animateActiveItem(aboutHelpListView, this.getSlideRightTransition());	
	}
});











