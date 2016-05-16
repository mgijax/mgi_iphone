Ext.define('GenomeCompass.view.Trash.TrashPanel', {
	extend: 'Ext.Panel',
	alias: 'widget.trashpanel',
	config: {
		itemId: 'trashPanel',
		bottom: '0%',
		height: '23%',
		width: '100%',
		hideOnMaskTap: false,
		modal: true,
		layout: 'vbox',
		items: [
			{
				xtype: 'button',
				itemId: 'trashPanelConfirmButton',
				text: 'Remove Unstarred',
				style: {
 					'color': 'red',
 					'font-size': '1.2em'
				},
				flex: 1
			},
			{
				xtype: 'button',
				itemId: 'trashPanelCancelButton',
				text: 'Cancel',
				style: {
 					'color': 'blue',
 					'font-size': '1.2em'
				},
				flex: 1
			}
		]
	}
});