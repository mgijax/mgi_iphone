Ext.define('GenomeCompass.model.Settings', {
	extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		fields: [
			{ name: 'date_last_sync', type: 'date', dateFormat: 'D M j, Y' },
			{ name: 'new_updates_counter', type: 'auto' },
			{ name: 'show_welcome', type: 'auto' }
		] // fields
	} // config
});