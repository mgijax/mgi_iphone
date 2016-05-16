Ext.define('GenomeCompass.view.About.AboutWelcome', {
	extend: 'Ext.Container',
	alias: 'widget.aboutwelcomeview',
	requires: [
		'Ext.Img'
	],

	config: {
		scrollable: 'vertical',
		title: 'Welcome',
		iconCls: 'home',
		cls: 'aboutwelcomeview',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},		
		layout: 'vbox',
		items: [
			{
				xtype: 'container',
				layout: 'vbox',
				pack: 'center',
				flex: 5,
				items: [
					{
						xtype: 'spacer',
						flex: 1
					},
					{
						xtype: 'panel',
						flex: 7,
						styleHtmlContent: true,
						html: [
							'<img width="50%" src="resources/icons/icon-large.png" />',
							'<h1>Welcome to MGI GenomeCompass!</h1>',
							'<p>Search for genes, disease terms, or phenotype terms. Tap a star to save the item as a Favorite.</p>'
						].join("")				
					}
				]
			},
			{
				xtype: 'container',
				layout: 'vbox',
				pack: 'end',
				flex: 2,
				items: [
					{
						xtype: 'spacer'
					},
					{
						xtype: 'panel',
						layout: 'hbox',
						pack: 'end'			
					}
				]
			},	
			{
				xtype: 'panel',
				layout: 'vbox',
				pack: 'end',	
				flex: 2,
				items: [
					{ 
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						itemId: 'welcomeViewOK',
						text: 'OK',
						height: '80px',
						style: 'font-size: 1.3em;'
					},
					{
						xtype: 'button',
						itemId: 'welcomeViewNoShow',
						ui: 'decline',
						text: 'Do not show again',
						height: '80px',
						style: 'font-size: 1.4em; margin-top: 5px;'					
					}
				]
			}
		],
		listeners: [
			{
				delegate: '#aboutWelcomeBackButton',
				event: 'tap',
				fn: 'onAboutWelcomeBackButtonTap'
			}
		] // listeners
	}, // end of config
	onAboutWelcomeBackButtonTap: function () {
		this.fireEvent('backToAboutListCommand', this);
	} // onAboutDevInfoBackButtonTap
});











