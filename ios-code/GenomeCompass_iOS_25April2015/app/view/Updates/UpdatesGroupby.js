Ext.define('GenomeCompass.view.Updates.UpdatesGroupby', {
	extend: 'Ext.Panel',
	alias: 'widget.updatesgroupby',
 
	config: {
		itemId: 'updatesGroupBy',
		left: '5%',
		top: '0%',
		height: '23%',
		width: '48%',
		hideOnMaskTap: true,
		modal: true,
		layout: 'vbox',
		items: [
			{
				xtype: 'button',
				itemId: 'groupByDateButton',
				text: 'Date',
				flex: 1
			},
			{
				xtype: 'button',
				itemId: 'groupBySymbolButton',
				text: 'Symbol/Term',
				flex: 1
			}
		]
	}
});