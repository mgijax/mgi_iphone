Ext.define('GenomeCompass.view.Faves.FavesPanel', {
	extend: 'Ext.TabPanel',
	alias: 'widget.favespanelview',
	requires: [
		'GenomeCompass.view.Faves.FavesList',
		'GenomeCompass.view.Faves.FavesDetail'
	],
	config: {
		scrollable: 'vertical',
		title: 'Favorites',
		iconCls: 'favorites',
		cls: 'favorites',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		items: [
			{ xtype: 'faveslistview'},
			{ xtype: 'favesdetailview' }
		]
	}
});
