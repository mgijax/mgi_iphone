Ext.define('GenomeCompass.store.Faves.Favorites', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "favoritesstore",
		model: 'GenomeCompass.model.Favorite',
		proxy: {
			type: 'localstorage',
			id: 'favoritesstoreproxy'
		},
		grouper: {
			sortProperty: 'group_index',
			groupFn: function (record) {
				var favoritesStore = Ext.getStore('favoritesstore'),
					geneCount = 0,
					diseasePhenoCount = 0;

				favoritesStore.each(function(record) {
					if (record.data.disp_filter == "Genes") { geneCount ++; }
					else if (record.data.disp_filter == "Diseases/Phenotypes") { diseasePhenoCount ++; }
				});

					if (record.data.disp_filter == "Genes") { 
						return record.get('disp_filter') + ' (' + geneCount + ')';
					}
					else if (record.data.disp_filter == "Diseases/Phenotypes") { 
						return record.get('disp_filter') + ' (' + diseasePhenoCount + ')';
					}

			}
		},
		sorters : [{
			property : 'label', 
			direction : 'Asc'
		}],
		autoLoad: true,
		listeners : {
			load : function (obj, records, successful, operation, eOpts ) { } // load
		} // listeners
	},
	initialize : function() { }
});


