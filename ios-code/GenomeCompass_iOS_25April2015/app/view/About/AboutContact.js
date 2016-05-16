Ext.define('GenomeCompass.view.About.AboutContact', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.field.Email',
		'Ext.field.TextArea',
		'Ext.form.FieldSet'
	],
	alias: 'widget.aboutcontactview',
	config: {
		id: 'aboutcontactview',
		itemId: 'aboutcontactview',		
		scrollable: 'vertical',
		title: 'Contact',
		iconCls: 'compose',
		layout: 'vbox',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		items:[
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Contact Us',
				itemId: 'contactTitlebar',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//wp text: 'About',
						iconCls: 'arrow-left',
						iconMask: true,
						itemId: 'aboutContactBackButton',
						align: 'left'
					},
					{
						xtype: 'button',
						iconCls: 'reply',
						iconMask: true,
						itemId: 'aboutContactSubmitButton',
						align: 'right'
					} // button	
				]		
			},
			{
				xtype : 'fieldset',
				instructions: 'Send an email to developers at the Mouse Genome Informatics resource to tell us what you think. <br><br>You can send a longer email message with suggestions or attachments to mgi-help@jax.org.',
				items:[
					{
						xtype: 'textfield',
						name: 'contact_name',
						label: 'Name',
						labelWidth: '35%',						
						placeHolder: 'First Last',
						clearIcon: true
					},
					{
						xtype: 'emailfield',
						name: 'contact_email',
						label: 'Email',
						labelWidth: '35%',						
						placeHolder: 'user@example.com',
						required: true,
						clearIcon: true
					},
					{
						xtype: 'textfield',
						name: 'contact_subject',
						label: 'Subject',
						labelWidth: '35%',						
						placeHolder: 'App Feedback',
						clearIcon: true
					},
					{
						xtype: 'textareafield',
						name: 'contact_message',
						label: 'Message',
						labelWidth: '35%',
						required: true,
						clearIcon: true
					}
				]
			}
		], // form panel items
		listeners: [
			{
				delegate: '#aboutContactBackButton',
				event: 'tap',
				fn: 'onAboutContactBackButtonTap'
			}
		] // listeners
	}, // end of config
	onAboutContactBackButtonTap: function () {
		this.fireEvent('backToAboutListCommand', this);
	} // onAboutContactBackButtonTap
});








