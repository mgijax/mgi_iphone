Ext.define('GenomeCompass.view.Updates.UpdatesListEditPanel', {
	extend: 'Ext.TabPanel',
	alias: 'widget.updateslisteditpanelview',
	requires: [
		'GenomeCompass.view.Updates.UpdatesList'
		],
	config: {
		scrollable: 'vertical',
		title: 'Updates',
		iconCls: 'time',
		cls: 'notifications',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		items: [
			{
				xtype: 'titlebar',
				title: 'Updates',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						text: 'Refresh',
						ui: 'action',
						itemId: 'updatesRefreshButton',
						align: 'left'
					}, // button	
					{
						xtype: 'button',
						text: 'Sort',
						ui: 'action',
						itemId: 'updatesGroupByButton',
						align: 'right',
						hidden: true
					} // button		
				] // titlebar items
			}, // titlebar
			{
				xtype: 'toolbar',
				itemId: 'updatesSearchToolbar',
				docked: 'top',
				ui: 'light',
				hidden: true,
				items: [
					{xtype: 'spacer'},
					{
						xtype : 'searchfield',
						itemId: 'updatesSearchField',
						cls: 'customField',						
						placeHolder: '  Filter ( symbol, term, update.. )',
						style: {width: '100%'},
						listeners: {
							keyup: function(field) {
								var value = field.getValue(),
									allUpdateResultsStore = Ext.getStore('allupdateresults');
								
								allUpdateResultsStore.clearFilter();

								if (value){
									var thisRegEx = new RegExp(value, "i");
									allUpdateResultsStore.filterBy(function(record) {
										if (thisRegEx.test(record.get('label')) ||
											thisRegEx.test(record.get('supTxt')) ||
											thisRegEx.test(record.get('update')) ||											
											thisRegEx.test(Ext.Date.format(record.get('pubdate'), 'm-d-Y')) ||																						
											thisRegEx.test(record.get('mgiId')) ) {	
											return true;
										};
										return false;
									});
								} // end of if
							}, // keyup
							clearicontap: function() {
								allUpdateResultsStore = Ext.getStore('allupdateresults');								
								allUpdateResultsStore.clearFilter();
							} // clearicontap
						} // listeners
					}, // searchfield
					{xtype: 'spacer'}
				] // toolbar items
			}, // searchfield toolbar
			{ xtype: 'updateslistview' }
		], // panel items
		listeners: {
			initialize: function() {
	
				// attaches a listener to the component that will be 
				// fired after the component is rendered or shown
     			this.on('painted', this.callFn);
			},
			callFn: function() {
				this.fireEvent('checkNumUpdatesCommand');
			}
		} // listeners
	} // config
});











