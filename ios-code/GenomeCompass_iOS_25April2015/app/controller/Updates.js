Ext.define('GenomeCompass.controller.Updates', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			updatesListView: 'updateslistview',
			updatesListEditPanelView: 'updateslisteditpanelview',
			updatesGroupBy: 'updatesgroupby',
			updatesGroupByButton: '.updateslisteditpanelview #updatesGroupByButton',
			updatesSearchToolbar: '.updateslisteditpanelview #updatesSearchToolbar',
			groupBySymbolButton: '.updatesgroupby #groupBySymbolButton',
			groupByDateButton: '.updatesgroupby #groupByDateButton',
			groupByPopup: {
				autoCreate: true,
				selector: '#updatesGroupBy',
				xtype: 'updatesgroupby'
			}
		},
		control: {
			updatesListView: {
				showUpdateDetailsCommand: 'onShowUpdateDetailsCommand'
			},
			updatesListEditPanelView: {
				checkNumUpdatesCommand: 'onCheckNumUpdatesCommand'				
			},
			updatesGroupByButton: {
				tap: 'onShowGroupByCommand'
			},
			groupBySymbolButton: {
				tap: 'onGroupBySymbolCommand'
			},
			groupByDateButton: {
				tap: 'onGroupByDateCommand'
			}
		}
	},
	onCheckNumUpdatesCommand: function () {
		var updatesListEditPanelView = this.getUpdatesListEditPanelView(),
			allUpdateResultsStore = Ext.getStore('allupdateresults'),
			numUpdates = allUpdateResultsStore.getCount(),
			updatesGroupByButton = this.getUpdatesGroupByButton(),
			updatesSearchToolbar = this.getUpdatesSearchToolbar();

		// hide and display components on the updates screen
		// depending on whether or not the user has any updates
		if (numUpdates == 0) { 
			updatesGroupByButton.hide(); 
			updatesSearchToolbar.hide();
		} else if (numUpdates > 0) {
			updatesGroupByButton.show();
			updatesSearchToolbar.show();
		} // end of else if
		updatesListEditPanelView.refresh();
	},
	onGroupBySymbolCommand: function() {

		var updatesListView = this.getUpdatesListView(),
			updatesGroupByView = this.getUpdatesGroupBy(),
			allUpdateResultsStore = Ext.getStore('allupdateresults'),
			sortersSymbol = [
				{
					property: 'pubdate',
					direction: 'DESC'
				},
				{
					property: 'index',
					direction: 'ASC'
				}
			];

		// hide the group by menu popup
		updatesGroupByView.hide();

		// set the grouper
		allUpdateResultsStore.setGrouper(function(record) {
			return record.get('sortAndGroupLabel');
		});

		// set the group direction
		allUpdateResultsStore.setGroupDir('ASC');

		// set the sorter
		allUpdateResultsStore.setSorters(sortersSymbol);

		// update the itemTpl in the updates view
		var itemTpl = Ext.create (
			'Ext.XTemplate',
			'<tpl for="."><div class="list-updates">',
				'<tpl if="status == \'unread\'">',			
					'<div class="unreadUpdate">',
						'<h4 class="updates_bold">{update}</h4>',
						'<h4 class="pubdates_bold">{pubdate:date("m-d-Y")}</h4>',
					'<div>',
				'</tpl>',
				'<tpl if="status == \'read\'">',
						'<h4 class="updates_unbold">{update}</h4>',
						'<h4 class="pubdates_unbold">{pubdate:date("m-d-Y")}</h4>',
				'</tpl>', 
			'</div></tpl>'				
		);
		updatesListView.setItemTpl(itemTpl);
	},
	onGroupByDateCommand: function() {
		var updatesListView = this.getUpdatesListView(),
			updatesGroupByView = this.getUpdatesGroupBy(),
			allUpdateResultsStore = Ext.getStore('allupdateresults'),
			sortersDate = [
				{
					property: 'sortAndGroupLabel',
					direction: 'ASC'
				},
				{
					property: 'index',
					direction: 'ASC'
				}
			];

		// hide the group by menu popup
		updatesGroupByView.hide();

		// set the grouper
		allUpdateResultsStore.setGrouper(function(record) {
			return Ext.Date.format(record.get('pubdate'), 'F j, Y');
		});

		// set the group direction
		allUpdateResultsStore.setGroupDir('DESC');

		// set the sorter
		allUpdateResultsStore.setSorters(sortersDate);

		// update the itemTpl in the updates view
		var itemTpl = Ext.create (
			'Ext.XTemplate',
			'<tpl for="."><div class="list-updates">',
				'<tpl if="status == \'unread\'">',			
					'<div class="unreadUpdate">',
						'<h4 class="updates_bold">{label}</h4>',
						'<h4 class="pubdates_bold">{update}</h4>',
					'<div>',
				'</tpl>',
				'<tpl if="status == \'read\'">',
						'<h4 class="updates_unbold">{label}</h4>',
						'<h4 class="pubdates_unbold">{update}</h4>',
				'</tpl>', 
			'</div></tpl>'			
		);
		updatesListView.setItemTpl(itemTpl);

		var groupDir = allUpdateResultsStore.getGroupDir();
		var groups = allUpdateResultsStore.getGroups();
	},
	onShowGroupByCommand: function(button, e, options) {
		var me = this;
		var popup = me.getGroupByPopup();
		popup.showBy(button); 
	},
	onShowUpdateDetailsCommand: function(list, record) {

		var mainView = Ext.Viewport.getComponent(0),
			allUpdateResultsStore = Ext.getStore('allupdateresults'),
			status = record.data.status,
			link = record.data.link,
			settingsStore = Ext.getStore('settingsstore'),
			settingsRecord = settingsStore.getAt(0),
			new_updates_counter_old = settingsRecord.data.new_updates_counter;
		
		// if the badge text of the Updates tab badge is > 0,
		// and the update the user tapped is currently unread,
		// decrease the counter by one and set record.status to 'read'
		if ((new_updates_counter_old > 0) && (status == 'unread')) {
			var new_updates_counter_new = new_updates_counter_old - 1;

			settingsRecord.set('new_updates_counter', new_updates_counter_new);
			settingsStore.sync();
			mainView.getTabBar().getComponent(0).setBadgeText(new_updates_counter_new);	

			// mark the clicked item as read
			record.set('status', 'read');
			allUpdateResultsStore.sync();
		} // end of if

		// open a web browser and display the item's detail page	
		var ref = window.open(link, '_system', 'location=yes', 'closebuttoncaption=Done');
	} // end of onShowUpdateDetailsCommand
});














