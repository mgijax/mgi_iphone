Ext.define('GenomeCompass.view.About.AboutHelpSearch', {
	extend: 'Ext.Panel',
	alias: 'widget.abouthelpsearchview',
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
				title: 'Searching',
				itemId: 'aboutHelpSearchTitlebar',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//wp text: 'Help',
						iconCls: 'arrow-left',
						iconMask: true,
						itemId: 'aboutHelpSearchBackButton',
						align: 'left'
					}					
				] // titlebar items
			},
			{
				xtype: 'panel',
				html: [
				'<div class=devInfo>',
				'<p>',
				'GenomeCompass Search leverages the QuickSearch functionality provided',
				' by the Mouse Genome Informatics group (MGI).',
				'<br>',
				'<br>',				
				' Powered by Solr/Lucine indexing, the MGI QuickSearch',
				' provides a fast and powerful means of querying the Mouse Genome Database',
				' for curated genetic and genomic data.',
				'<br>',
				'<br>',
				'<u>Using the Search</u>:',
				'<br>',
				'1. Go to the Search tab',
				'<br>',
				'2. Type your query (name, symbol, or ID) into the search bar',
				'<br>',
				'3. Tap an unstarred item to add it to your Favorites list',
				'<br>',
				'4. Tap a starred item to remove it from your Favorites list',
				'</div>'
				].join("")
			}
		], // end of items
		listeners: [
			{
				delegate: '#aboutHelpSearchBackButton',
				event: 'tap',
				fn: 'onAboutHelpSearchBackButtonTap'
			}
		] // listeners
	}, // end of config
	onAboutHelpSearchBackButtonTap: function () {
		this.fireEvent('backToHelpListCommand', this);
	} // onAboutDevInfoBackButtonTap
});