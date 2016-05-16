Ext.define('GenomeCompass.view.About.AboutHelpPanel', {
	extend: 'Ext.TabPanel',
	alias: 'widget.abouthelppanelview',
	requires: [
		'GenomeCompass.view.About.AboutHelpList',
		'GenomeCompass.view.About.AboutHelpSearch',
		'GenomeCompass.view.About.AboutHelpFaves',
		'GenomeCompass.view.About.AboutHelpUpdates'	
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
			{ xtype: 'abouthelplistview' },
			{ xtype: 'abouthelpsearchview' },
			{ xtype: 'abouthelpfavesview' },
			{ xtype: 'abouthelpupdatesview'}
		]
	}
});
