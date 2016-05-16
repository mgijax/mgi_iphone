Ext.define('GenomeCompass.store.Update.diseaseUpdateResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "diseaseupdateresults",
		model: 'GenomeCompass.model.UpdateResult',
		proxy: {
			type: 'localstorage',
			id: 'diseaseupdateresultsproxy'
		},
		autoLoad: true
	}
});
