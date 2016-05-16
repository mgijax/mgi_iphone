Ext.define('GenomeCompass.view.About.AboutHelpList', {
	extend: 'Ext.List',
	alias: 'widget.abouthelplistview',
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
				{title: 'How does the Search work?'},
				{title: 'How do I add Favorites?'},
				{title: 'How can I control which updates I receive?'}
			]
		},
		itemTpl: '{title}',
		items: [
			{
				xtype: 'titlebar',
				title: 'Help',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//wp text: 'About',
						iconCls: 'arrow-left',
						iconMask: true,
						itemId: 'aboutHelpListBackButton',
						align: 'left',
						listeners: {
                			tap: function() {
								this.fireEvent('backToAboutListCommand', this);
                			} // end tap
            			} // end listeners
					} // items					
				] // titlebar items
			} // titlebar
		], // list items
		listeners: {
			itemtap: function (list, index, target, record, event) {	
				setTimeout(function(){list.deselect(index);},150);
				this.fireEvent('displayHelpSubpageCommand', list, index, target, record, event);//, this, list, index, record);
			}//,		
		}//, // listeners
	}//, // end of config			
});

