Ext.define('GenomeCompass.store.Update.geneUpdateResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "geneupdateresults",
		model: 'GenomeCompass.model.UpdateResult',
		proxy: {
			type: 'localstorage',
			id: 'geneupdateresultsproxy'
		},
		autoLoad: true
	}
});
