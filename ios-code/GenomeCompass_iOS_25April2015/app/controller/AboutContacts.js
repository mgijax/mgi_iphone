Ext.define('GenomeCompass.controller.AboutContacts', {
	extend: 'Ext.app.Controller', 
	config:{
		refs: {
			// We're going to look up our views by alias.			
			aboutContactView: '#aboutcontactview',

			// look up components by id
			aboutContactSubmitButton: '.aboutcontactview #aboutContactSubmitButton'			
		},
		control: {
			// The commands fired by the contactSubmitButton in the contact view
			aboutContactSubmitButton: {
				tap: 'onAboutContactSubmitCommand'
			}
		}
	},
	onAboutContactSubmitCommand: function(){
		var $this = this,
			aboutContactView = this.getAboutContactView(),
			formValues = aboutContactView.getValues(),
			contact_name = formValues['contact_name'],
			contact_email = formValues['contact_email'],
			contact_subject = formValues['contact_subject'],
			contact_message = formValues['contact_message'],
			contact_rating = formValues['contact_rating'],
			ereg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			validEmail = ereg.test(contact_email);

		// fill the contact _name and contact_subject in if the user left them blank
		if (contact_subject == "") { contact_subject = "Feedback on GenomeCompass" }
		if (contact_name == "") { contact_name = "Anonymous" }			

		// make sure email and message fields are filled in
		if ((contact_email == "") && (contact_message == "")) { 
			Ext.Msg.alert('', 'Email address & Message required', Ext.emptyFn); 
			return; 
		} else if (contact_email == "") {
			Ext.Msg.alert('', 'Email address required', Ext.emptyFn); 			
				return; 
		} else if (contact_message == "") { 
			Ext.Msg.alert('', 'Message required', Ext.emptyFn); 			
			return; 
		} // end of else if

		// make sure the email address is valid
		if (validEmail == false) { 
			Ext.Msg.alert('', 'You must provide a valid email address', Ext.emptyFn); 			
			return; 
		} // end of if

		// make the JSONP call to the backend server
		Ext.data.JsonP.request({
			url: 'http://proto.informatics.jax.org/prototypes/iphone_app/cgi/contactUs.php',
			callbackKey: 'callback',     // the callbackKey is used for JSONP requests
			withCredentials: true,       // JSONP things
			useDefaultXhrHeader: false,  // JSONP things
			timeout: 5000,

			// now we define the params to be sent to the server
			params: {
				contact_name: contact_name,
				contact_email: contact_email,
				contact_subject: contact_subject,
				contact_message: contact_message,
				contact_rating: contact_rating,
				format: 'json'
			},
			success: function(rtndata, opts) {

				var contact_name = rtndata.contact_name,
					contact_email = rtndata.contact_email,
					contact_subject = rtndata.contact_subject,
					contact_message = rtndata.contact_message,
					contact_rating = rtndata.contact_rating;

				Ext.Msg.alert('Thank you!', 'Your message has been sent', Ext.emptyFn); 			
		
				$this.resetForm();
			},
			failure: function(rtndata, opts) {
			Ext.Msg.alert('Send failed', 'Email mgi-help@jax.org if the problem persists', Ext.emptyFn); 				
			},
			callback: function(options, success, rtndata) { }
		});
	},
	resetForm: function() {
		this.getAboutContactView().reset();
	}
});