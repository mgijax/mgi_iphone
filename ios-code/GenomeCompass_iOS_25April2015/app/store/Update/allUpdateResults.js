Ext.define('GenomeCompass.store.Update.allUpdateResults', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "allupdateresults",
		model: 'GenomeCompass.model.UpdateResult',
		proxy: {
			type: 'localstorage',
			id: 'allupdateresultsproxy'
		},

		/* settings for group/sort by symbol [default] */
		sorters: [
			{
				property: 'pubdate',
				direction: 'DESC'
			},
			{
				property: 'index',
				direction: 'ASC'
			}
		],
		grouper: {
			groupFn: function(record) {
				return record.get('sortAndGroupLabel');// + ':';
			}
		},
		groupDir: 'ASC',
		autoLoad: true
	} // end config
});
