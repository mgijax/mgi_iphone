Ext.define('GenomeCompass.view.Search.SearchPanel', {
	extend: 'Ext.TabPanel',
	alias: 'widget.searchpanelview',
	requires: [
		'GenomeCompass.view.Search.SearchList'
	],
	config: {
		scrollable: 'vertical',
		title: 'Search',
		iconCls: 'search',
		cls: 'search',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		items: [
			{ xtype: 'searchlistview' }
		]
	}
});
