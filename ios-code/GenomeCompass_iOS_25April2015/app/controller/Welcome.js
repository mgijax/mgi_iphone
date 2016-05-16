Ext.define('GenomeCompass.controller.Welcome', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			// look up views by alias
			welcomeView: 'welcomeview'
		},
		control: {
			welcomeView: {
				welcomeViewDismissCommand: 'onWelcomeViewDismissCommand'
			}
		} // end of control
	},
	onWelcomeViewDismissCommand: function() {
 		var mainView = Ext.Viewport.getComponent(0),
 			welcomeScreen = this.getWelcomeView(),
			settingsStore = Ext.getStore('settingsstore'),
			settingsRecord = settingsStore.getAt(0),
			newValues = welcomeScreen.getValues(),
			show_welcome_status = newValues.show_welcome;			

 		// show the tabbar and hide the welcomeview		
		mainView.getTabBar().show();
		welcomeScreen.hide();

		// see if the box was checked or not
		// and update the settings store accordingly
		if (show_welcome_status == "1") { settingsRecord.set('show_welcome', "1"); }
		else if (show_welcome_status == null) { settingsRecord.set('show_welcome', "0"); }
		settingsStore.sync();	
	} // end of onWelcomeViewDismissCommand
});









