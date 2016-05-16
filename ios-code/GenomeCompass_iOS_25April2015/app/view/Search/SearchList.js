Ext.define('GenomeCompass.view.Search.SearchList', {
	extend: 'Ext.List',
	alias: 'widget.searchlistview',
	requires: [
		'Ext.TitleBar',
		'Ext.field.Search',
		'Ext.dataview.List',
		'Ext.data.proxy.JsonP',
		'Ext.data.Store',
		'GenomeCompass.store.Faves.Favorites'
	],
	config: {
		scrollable: 'vertical',
		title: 'Search',
		iconCls: 'search',
		cls: 'search',
		tabBar:{
			docked: 'bottom',
			hidden: true
		},
		navigationBar: {
			hidden: true
		},
		store: 'allsearchresults',
		itemCls: 'list-item-custom',
		grouped: true,
		ui: 'round',
		setHtmlContent: true,
		loadingText: 'Loading Search Results...',
		emptyText: '<div class="faves-list-empty">Search the Mouse Genome Database for genes or disease areas of interest <br>(keywords, symbols, or IDs)</div>',
		itemTpl: Ext.create (
			'Ext.XTemplate',
			'<tpl for="."><div class="list-master">',
				'<tpl if="origin == \'gf_results\'">',			
					'<div class="gene-avatar" style="background-image: url({[values.state]})"></div>',
					'<h3 class="genes">{symbol:ellipsis(40, false)}</h3>', //updated but guessed 28
					'<h4 class="genes">{name:ellipsis(40, false)}</h4>', //updated
				'<tpl else>',
					'<div class="pheno-avatar" style="background-image: url({[values.state]})"></div>',
					'<h3 class="phenos">{term:ellipsis(40, false)}</h3>', //updated
					'<h4 class="phenos">{type}</h4>',
				'</tpl>',
			'</div></tpl>'	
		),
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [
					{xtype: 'spacer'},
					{
						xtype: 'searchfield',
						itemId: 'searchMGI',
						cls: 'customField',
						style: {width: '70%'},
						placeHolder: '  Search MGI',
						listeners: {
							clearicontap: function() {
								this.fireEvent('clearSearchCommand');
							} // clearicontap
						}
					},
					{
						xtype: 'spacer',
						itemId: 'hiddenSpacer'
					}		
				] // toolbar items
			} // toolbar
		], // list items
		listeners: {
			
			// itemdoubletap: function (list, index, target, record, evt) {
			// 	alert("in doubletap");
			// 	setTimeout(function(){list.deselect(index);},150);
			// 	this.fireEvent('openSearchResultUrlCommand', this, record);
			// }, // itemdoubletap

			itemtap: function (list, index, target, record, event) {

			// figure out if the record is in the user's favorites
			// if find is true, a record with this mgi id is already in the user's favorites list,
			// so set the timeout to 0 so it doesn't like the list element is clickable
			var favoritesStore = Ext.getStore('favoritesstore'),
				find = favoritesStore.find('mgiId', record.data.mgiId);
			
				setTimeout(function(){list.deselect(index);},150);
				this.fireEvent('changeTheBoxCommand', this, record);
				
			} // itemtap		

		} // listeners
	}, // config
	initialize: function(){
		
		// clear the allsearchresults store
		allSearchResultsStore = Ext.getStore('allsearchresults');
		allSearchResultsStore.removeAll();
		allSearchResultsStore.sync();

		this.callParent();
	}
});

