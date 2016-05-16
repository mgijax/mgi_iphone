Ext.define('GenomeCompass.view.Trash.TrashSearchPanel', {
	extend: 'Ext.Panel',
	alias: 'widget.trashsearchpanel',
	config: {
		itemId: 'trashSearchPanel',
		bottom: '0%',
		height: '23%',
		width: '100%',
		hideOnMaskTap: false,
		modal: true,
		layout: 'vbox',
		items: [
			{
				xtype: 'button',
				itemId: 'trashSearchPanelConfirmButton',
				text: 'Remove Unstarred',
				style: {
 					'color': 'red',
 					'font-size': '1.2em'
				},
				flex: 1
			},
			{
				xtype: 'button',
				itemId: 'trashSearchPanelCancelButton',
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