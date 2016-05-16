Ext.define('GenomeCompass.view.About.AboutDevInfo', {
	extend: 'Ext.Panel',
	alias: 'widget.aboutdevinfoview',
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
				title: 'Developer Info',
				itemId: 'aboutDevInfoTitlebar',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//wp text: 'About',
						iconCls: 'arrow-left',
						iconMask: true,
						itemId: 'aboutDevInfoBackButton',
						align: 'left'
					}					
				] // titlebar items
			},
			{
				xtype: 'panel',
				html: [
				'<div class=devInfo>',
				'<p><b>MGI GenomeCompass </b>',
				'was developed collectively by the Mouse Genome Informatics (MGI) group at The Jackson Laboratory ',
				'in Bar Harbor, Maine, USA.</p>',
				'<br>',
				'<u>Credits</u>',
				'<p>',
				'<b>Conceptualization:</b> Dr. Carol Bult, Professor.',
				'<br>',
				'<b>Engineering:</b> Drs. Jill Recla and Wendy Pitman, Bioinformatics Analysts.</p>',
				'<br>',
				'Special thanks to Dr. Joel Richardson and Kim Forthofer for backend server work and design input, respectively.',
				'</div>'
				].join("")

			}
		], // end of items
		listeners: [
			{
				delegate: '#aboutDevInfoBackButton',
				event: 'tap',
				fn: 'onAboutDevInfoBackButtonTap'
			}
		] // listeners
	}, // end of config
	onAboutDevInfoBackButtonTap: function () {
		this.fireEvent('backToAboutListCommand', this);
	} // onAboutDevInfoBackButtonTap
});