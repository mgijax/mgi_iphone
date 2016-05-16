Ext.define('GenomeCompass.view.About.AboutHelpUpdates', {
	extend: 'Ext.Panel',
	alias: 'widget.abouthelpupdatesview',
	config: {
		scrollable: 'vertical',
		title: 'About',
		iconCls: 'info',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Controlling Updates',
				itemId: 'aboutHelpUpdatesTitlebar',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//wp text: 'Help',
						iconCls: 'arrow-left',
						iconMask: true,
						itemId: 'aboutHelpUpdatesBackButton',
						align: 'left'
					}					
				] // titlebar items
			},
				{
				xtype: 'panel',
				html: [
				'<div class=devInfo>',
				'Updates are controlled individually for each item in your Favorites list.',
				'<br>',
				'All updates are enabled by default.',
				'<br>','<br>',
				'<u>To change your update preferences</u>:',
				'<br>',
				'1. Go to the Favorites tab',
				'<br>',
				'2. Tap the item you wish to modify',
				'<br>',
				'3. Under Notification Preferences, deselect the updates you no longer wish to receive',
				'<br>',
				'<br>',
				'Doubletap an update to view the corresponding web page in MGI', 
				'<br>',
				'</div>'
				].join("")
			}
		], // end of items
		listeners: [
			{
				delegate: '#aboutHelpUpdatesBackButton',
				event: 'tap',
				fn: 'onAboutHelpUpdatesBackButtonTap'
			}
		] // listeners
	}, // end of config
	onAboutHelpUpdatesBackButtonTap: function () {
		this.fireEvent('backToHelpListCommand', this);
	} // onAboutDevInfoBackButtonTap
});