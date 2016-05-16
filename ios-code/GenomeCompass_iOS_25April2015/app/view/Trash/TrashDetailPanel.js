Ext.define('GenomeCompass.view.Trash.TrashDetailPanel', {
	extend: 'Ext.Panel',
	alias: 'widget.trashdetailpanel',
	config: {
		itemId: 'trashDetailPanel',
		bottom: '0%',
		height: '23%',
		width: '100%',
		hideOnMaskTap: false,
		modal: true,
		layout: 'vbox',
		items: [
			{
				xtype: 'button',
				itemId: 'trashDetailPanelConfirmButton',
				text: 'Remove from Favorites',
				style: {
 					'color': 'red',
 					'font-size': '1.2em'
				},
				flex: 1
			},
			{
				xtype: 'button',
				itemId: 'trashDetailPanelCancelButton',
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