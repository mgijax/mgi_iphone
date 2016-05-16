Ext.define('GenomeCompass.view.About.AboutList', {
	extend: 'Ext.List',
	alias: 'widget.aboutlistview',
	requires: [
		'Ext.TitleBar',
		'Ext.dataview.List'
	],
	config: {
		scrollable: 'vertical',
		title: 'About',
		iconCls: 'info',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		store: {
			fields: ['title'],
			data: [
				{title: 'Help'},
				{title: 'Developer info'},
				{title: 'Show Welcome'},
				{title: 'Send feedback'}
			]
		},
		itemTpl: '{title}',
		items: [
			{
				xtype: 'titlebar',
				title: 'About',
				docked: 'top'
			} // titlebar
		], // list items
		listeners: {
			itemtap: function (list, index, target, record, event) {	
				setTimeout(function(){list.deselect(index);},150);
				this.fireEvent('displayAboutSubpageCommand', list, index, target, record, event);
			}
		} // listeners
	} // config	
});
