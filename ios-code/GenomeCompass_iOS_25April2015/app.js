/*
	This file is generated and updated by Sencha Cmd. You can edit this file as
	needed for your application, but these edits will have to be merged by
	Sencha Cmd when it performs code generation tasks such as generating new
	models, controllers or views and when running "sencha app upgrade".

	Ideally changes to this file would be limited and most work would be done
	in other places (such as Controllers). If Sencha Cmd cannot merge your
	changes and its generated code, it will produce a "merge conflict" that you
	will need to resolve manually.
*/
Ext.Loader.setPath({
	'Ext': 'touch/src',
    'App': 'app',
    'Ext.ux': 'ux',
    'Ext.util.Connection': './app/util/Connection.js'
});


Ext.application({
	name: 'GenomeCompass',

	requires: [
		'Ext.MessageBox',
		'Ext.util.Connection',
		'Ext.device.Connection',
		'Ext.device.Communicator',
		'Ext.device.connection.Cordova',
		'Ext.device.connection.Sencha',
		'Ext.device.connection.Simulator'
	],
	views: [
		'Main',
		'Welcome',
		'Search.SearchPanel',
		'Search.SearchList',
		'Faves.FavesPanel',
		'Faves.FavesListEditPanel',
		'Faves.FavesList',
		'Faves.FavesEdit',
		'Faves.FavesDetail',
		'Updates.UpdatesListEditPanel',
		'Updates.UpdatesList',
		'Updates.UpdatesGroupby',
		'About.AboutPanel',
		'About.AboutList',
		'About.AboutDevInfo',
		'About.AboutWelcome',
		'About.AboutHelpPanel',
		'About.AboutHelpList',
		'About.AboutHelpSearch',
		'About.AboutHelpFaves',
		'About.AboutHelpUpdates',
		'About.AboutContact',
		'Trash.TrashPanel',
		'Trash.TrashDetailPanel',
		'Trash.TrashSearchPanel'		
	],

	models: [
		'SearchResult',
		'Favorite',
		'UpdateResult',
		'Settings'
	],

	stores: [
		'Search.allSearchResults',
		'Search.gfSearchResults',
		'Search.phenoSearchResults',
		'Search.diseaseSearchResults',
		'Update.allUpdateResults',                      
		'Update.geneUpdateResults',
		'Update.phenoUpdateResults',
		'Update.diseaseUpdateResults',
		'Faves.Favorites',
		'Settings'
	],

	controllers: [
		'About',
		'AboutContacts',
		'Faves',
		'Main',
		'Searches',
		'Updates',
		'Welcome'
	],

	icon: 'resources/icons/icon.png',
	// {
 //        57: 'resources/icons/icon.png',
 //        72: 'resources/icons/icon-72.png',
 //        114: 'resources/icons/icon@2x.png',
 //        144: 'resources/icons/icon-72@2x.png'
	// },

	isIconPrecomposed: true,

	startupImage: {
		'320x460': 'resources/startup/320x460.jpg',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},

	launch: function() {

		Ext.util.Connection.on('offline', this.lostConnection, this);
		Ext.util.Connection.on('online', this.regainedConnection, this);

		if (!Ext.util.Connection.isOnline()){
			
			Ext.Msg.alert('No Internet Connectivity', 
				"This application requires an internet connection.  Please check your connection.");
			
		}// else {

			// Destroy the #appLoadingIndicator element
			Ext.fly('appLoadingIndicator').destroy();

			// Initialize the main view
			Ext.Viewport.add(Ext.create('GenomeCompass.view.Main'));

			document.addEventListener("deviceready", this.onDeviceReady, false);


		//}
	},

	onDeviceReady: function() {
	    window.open = cordova.InAppBrowser.open;
	},

	lostConnection: function() {
		Ext.Msg.alert('Internet Connectivity Lost', 
				"This application requires an internet connection.  Please check your connection.");
	},

	regainedConnection: function() {
		Ext.Msg.alert('Internet Connectivity Restored', 
				"Your internet coonection has been restored. You may resume your task.");	
	},

	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
