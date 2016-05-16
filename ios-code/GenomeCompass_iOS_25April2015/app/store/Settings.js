Ext.define('GenomeCompass.store.Settings', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],
	config: {
		storeId: "settingsstore",
		model: 'GenomeCompass.model.Settings',
		proxy: {
			type: 'localstorage',
			id: 'settingsproxy'
		},
		autoLoad: true
	}
});
