Ext.define('GenomeCompass.store.Search.gfSearchResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "gfsearchresults",
		model: 'GenomeCompass.model.SearchResult',
		proxy: {
			type: 'localstorage',
			id: 'gfsearchresultsproxy'
		},
		autoLoad: true
	}
});
