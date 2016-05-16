Ext.define('GenomeCompass.view.About.AboutPanel', {
	extend: 'Ext.TabPanel',
	alias: 'widget.aboutpanelview',
	requires: [
		'GenomeCompass.view.About.AboutList',
		'GenomeCompass.view.About.AboutDevInfo',
		'GenomeCompass.view.About.AboutWelcome',
		'GenomeCompass.view.About.AboutHelpPanel',
		'GenomeCompass.view.About.AboutContact'
	],
	config: {
		scrollable: 'vertical',
		title: 'About',
		iconCls: 'info',
		cls: 'info',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		items: [
			{ xtype: 'aboutlistview' },
			{ xtype: 'aboutdevinfoview' },
			{ xtype: 'aboutwelcomeview' },
			{ xtype: 'abouthelppanelview' },
			{ xtype: 'aboutcontactview' }
		]
	}
});
