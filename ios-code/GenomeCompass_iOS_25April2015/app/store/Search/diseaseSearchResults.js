Ext.define('GenomeCompass.store.Search.diseaseSearchResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "diseasesearchresults",
		model: 'GenomeCompass.model.SearchResult',
		proxy: {
			type: 'localstorage',
			id: 'diseasesearchresultsproxy'
		},
		autoLoad: true
	}
});
