Ext.define('GenomeCompass.view.Settings', {
	extend: 'Ext.form.Panel',
	alias: 'widget.settingsview',
	requires: [
		'Ext.field.Toggle'
	],
	config: {
		scrollable: 'vertical',
		cls: 'settings',
		title: 'Settings',
		iconCls: 'settings',
		scrollable: true,
		xtype: 'formpanel',
		items: [
			{
				xtype: 'panel',
				padding: 20,
				flex: 20,
				items: [
					{
						defaults: {
							labelWidth: '75%'
						},
						items: [
							{
								xtype: 'spacer',
								padding: 10,
								flex: 10
							},							
							{
								xtype: 'toolbar',
								title: 'Settings',
								docked: 'top',
								ui: 'dark'
							},
							{
								xtype: 'togglefield',
								id: 'alertBox',
								name: 'alertBox',
								label: 'Alert Box',
								value: 1					
							},
							{
								xtype: 'togglefield',
								id: 'beepBox',								
								name: 'beep',
								label: 'Beep',
								value: 1
							},
							{
								xtype: 'togglefield',
								id: 'vibrateBox',
								name: 'vibrate',
								label: 'Vibrate',
								value: 1
							}
						] // items
					}
				] // items
			},
			{
				xtype: 'spacer',
				flex: 1
			},
			{
				xtype: 'panel',
				padding: 20,
				flex: 20,
				items: [
					{
						defaults: {
							labelWidth: '75%'
						},		
						items: [	
							{
								xtype: 'togglefield',
								id: 'autoSyncBox',
								name: 'autoSyncBox',
								label: 'Auto-sync on load',
								value: 1
							}
						] // items
					} // items
				] // items
			}
		]
	}
});
