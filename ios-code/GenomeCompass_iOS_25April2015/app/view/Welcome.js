Ext.define('GenomeCompass.view.Welcome', {
	extend: 'Ext.form.Panel',
	alias: 'widget.welcomeview',
	requires: [
		'Ext.Img'
	],
	config: {
		scrollable: 'vertical',
		cls: 'welcomeview',
		title: 'Welcome',
		iconCls: 'home',
		height: '100%',
	 	layout: {
		    type: 'vbox',
		    align: 'center',
		    pack: 'center'
		},
		items: [
			{
				xtype: 'panel',
				docked: 'top',
				styleHtmlContent: true,
				html: [
					'<img width="50%" src="resources/icons/icon-large.png" />',
					'<h1>Welcome to MGI GenomeCompass!</h1>',
					'<p>Search for genes, disease terms, or phenotype terms. Tap a star to save the item as a Favorite.</p>'
				].join("")			
			},
			{
				xtype: 'button',
				itemId: 'welcomeViewOK',
				text: 'OK',
				width: '50%',
			}
		],
		listeners: [
			{
				delegate: '#welcomeViewOK',
				event: 'tap',
				fn: 'onWelcomeViewOKTap'
			}
		]
	},
	onWelcomeViewOKTap: function () {
		this.fireEvent('welcomeViewDismissCommand', this);
	} // onFaveDetailBackButtonTap
});









