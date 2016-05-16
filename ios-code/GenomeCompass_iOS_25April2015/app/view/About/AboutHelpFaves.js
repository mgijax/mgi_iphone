Ext.define('GenomeCompass.view.About.AboutHelpFaves', {
	extend: 'Ext.Panel',
	alias: 'widget.abouthelpfavesview',
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
				title: 'Adding Favorites',
				itemId: 'aboutHelpFavesTitlebar',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//wp text: 'Help',
						iconCls: 'arrow-left',
						iconMask: true,
						itemId: 'aboutHelpFavesBackButton',
						align: 'left'
					}					
				] // titlebar items
			},
			{
				xtype: 'panel',
				html: [
				'<div class=devInfo>',
				'<p>',
				'Favorites are added to your GenomeCompass Favorites list through the Search tab',
				' and are stored locally on your device.',
				'<br>',
				'<br>',
				'<u>To add a Favorite</u>:',
				'<br>',
				'1. Go to the Search tab',
				'<br>',
				'2. Search for a gene, disease, or phenotype of interest',
				'<br>',
				'3. Tap a returned item to add it to your Favorites list',
				'<br>',
				'<br>',
				'Filled stars on the Search and Favorites tabs denote items currently in your Favorites list',
				'<br>',
				'<br>',
				'Doubletap a returned or favorite item to view it in MGI',
				'</div>'
				].join("")
			}
		], // end of items
		listeners: [
			{
				delegate: '#aboutHelpFavesBackButton',
				event: 'tap',
				fn: 'onAboutHelpFavesBackButtonTap'
			}
		] // listeners
	}, // end of config
	onAboutHelpFavesBackButtonTap: function () {
		this.fireEvent('backToHelpListCommand', this);
	} // onAboutDevInfoBackButtonTap
});