Ext.define('GenomeCompass.store.Search.allSearchResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "allsearchresults",
		model: 'GenomeCompass.model.SearchResult',
		proxy: {
			type: 'localstorage',
			id: 'allsearchresultsproxy'
		},
		grouper: {
			sortProperty: 'group_index',
			groupFn: function (item) {
				return item.get('disp_filter');
			}
		},
		sorters : [{
			property : 'index', 
			direction : 'Asc'
		}],
		autoLoad: true
	}
});
