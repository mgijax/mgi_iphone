Ext.define('GenomeCompass.store.Update.phenoUpdateResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "phenoupdateresults",
		model: 'GenomeCompass.model.UpdateResult',
		proxy: {
			type: 'localstorage',
			id: 'phenoupdateresultsproxy'
		},
		autoLoad: true
	}
});
