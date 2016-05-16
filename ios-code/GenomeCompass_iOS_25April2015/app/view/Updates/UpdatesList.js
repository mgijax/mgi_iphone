Ext.define('GenomeCompass.view.Updates.UpdatesList', {
	extend: 'Ext.List',
	alias: 'widget.updateslistview',
	requires: [
		'Ext.TitleBar',
		'Ext.dataview.List',
		'Ext.plugin.PullRefresh'
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
		store: 'allupdateresults',	
		itemCls: 'list-entry',
		grouped: true,
		ui: 'round',
		itemId: 'updatesList',
		loadingText: 'Loading Updates...',
		emptyText: '<div class="faves-list-empty">No updates within last 30 days<br>(Mobile data or wifi connection required for update refresh)</div>',
		itemTpl: Ext.create (
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
		),		
		listeners: {
			itemdoubletap: function (list, index, target, record, event) {	
				setTimeout(function(){list.deselect(index);},100);
				this.fireEvent('showUpdateDetailsCommand', this, record);
			},
			initialize: function() {
				this.fireEvent('checkNumFavesCommand', this);
				this.fireEvent('setDateLastSyncCommand', this);
			} // end of initialize listener
		} // listeners
	} // config	
});


