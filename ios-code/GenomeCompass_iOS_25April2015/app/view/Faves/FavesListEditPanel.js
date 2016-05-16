Ext.define('GenomeCompass.view.Faves.FavesListEditPanel', {
	extend: 'Ext.TabPanel',
	alias: 'widget.faveslisteditpanelview',
	requires: [
		'GenomeCompass.view.Faves.FavesList',
		'GenomeCompass.view.Faves.FavesEdit'
	],
	config: {
		scrollable: 'vertical',
		title: 'Favorites',
		iconCls: 'favorites',
		cls: 'favorites',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		items: [
			{
				xtype: 'titlebar',
				title: 'Favorites',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						text: 'Edit',
						ui: 'action',
						itemId: 'favesEditCancelButton',
						align: 'right'
					} // button					
				] // titlebar items
			}, // titlebar
			{
				xtype: 'toolbar',
				itemId: 'faveSearchToolbar',
				docked: 'top',
				ui: 'light',
				items: [
					{xtype: 'spacer'},
					{
						xtype : 'searchfield',
						itemId: 'faveSearchField',
						cls: 'customField',						
						placeHolder: '  Filter ( symbol, term, label.. )',
						style: {width: '100%'},
						listeners: {
							keyup: function(field) {
								var value = field.getValue(),
									favoritesstore = Ext.getStore('favoritesstore');
								
								favoritesstore.clearFilter();

								if (value){
									var thisRegEx = new RegExp(value, "i");
									favoritesstore.filterBy(function(record) {
										if (thisRegEx.test(record.get('symbol')) ||
											thisRegEx.test(record.get('supTxt')) ||
											thisRegEx.test(record.get('name')) ||
											thisRegEx.test(record.get('term')) ||
											thisRegEx.test(record.get('mgiId')) ||
											thisRegEx.test(record.get('user_label'))) {											
											return true;
										};
										return false;
									});
								} // end of if
							}, // keyup
							clearicontap: function() {
								favoritesstore = Ext.getStore('favoritesstore');								
								favoritesstore.clearFilter();
							} // clearicontap
						} // listeners
					}, // searchfield
					{xtype: 'spacer'}
				] // toolbar items
			}, // searchfield toolbar
			{ xtype: 'faveslistview' },
			{ xtype: 'faveseditview' },
			{ xtype: 'favesdetailview' }
		]
	}
});