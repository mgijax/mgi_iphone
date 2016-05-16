Ext.define('GenomeCompass.model.UpdateResult', {
	extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		fields: [
			{ name: 'mgiId', type: 'auto' },		
			{ name: "type", type: "string" },
			{ name: "label", type: "string" },
			{ name: 'sortAndGroupLabel',
				convert: function(value, record) {
					var label = record.get('label');
					sortAndGroupLabel = Ext.String.capitalize(label);
					return sortAndGroupLabel;
				} // end of convert
			},
			{ name: "update", type: "string" },
			{ name: "link", type: "string" },
			{ name: "pubdate", type: "date" },
			{ name: 'origin', type: 'auto' },
			{ name: 'disp_filter', type: 'auto' },
			{ name: 'group_index', type: 'auto' },
			{ name: 'index', type: 'auto'},
			{ name: 'status', type: 'auto' }
		], // fields
		proxy: {
			type: 'localstorage',
			id: 'proxyMarkers'
		}
	} // config
});
