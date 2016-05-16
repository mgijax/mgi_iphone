Ext.define('GenomeCompass.store.Search.phenoSearchResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "phenosearchresults",
		model: 'GenomeCompass.model.SearchResult',
		proxy: {
			type: 'localstorage',
			id: 'phenosearchresultsproxy'
		},
		autoLoad: true
	}
});
