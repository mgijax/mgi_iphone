Ext.define('GenomeCompass.view.Main', {
	extend: 'Ext.TabPanel',
	alias: 'widget.mainview',
	config: {
		fullscreen: true,
		scrollable: 'vertical',
		tabBarPosition: 'bottom',
		tabBar: {
			defaults: {
				flex: 1
			}
		},
		items: [
			{ xtype: 'updateslisteditpanelview' },
			{ xtype: 'favespanelview' },
			{ xtype: 'searchpanelview' },					
			{ xtype: 'aboutpanelview' }
		],
		listeners: {
			initialize: function() {
				this.fireEvent('setDateLastSyncCommand', this);
				
				var settingsStore = Ext.getStore('settingsstore'),
				settingsRecord = settingsStore.getAt(0),
				show_welcome = settingsRecord.data.show_welcome;

				if (show_welcome == "1") { 
					this.fireEvent('showWelcomeCommand', this); 
					settingsRecord.set('show_welcome', '0');
				}

				// sync for updates if the user has any favorites
				var favoritesStore = Ext.getStore('favoritesstore');
				var numFaves = favoritesStore.getCount();
				if (numFaves > 0) {	this.fireEvent('loadUpdatesCommand', this); }
			} // end of initialize listener
		} // listeners
	} // end config
});
