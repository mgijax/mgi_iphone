Ext.define('GenomeCompass.view.Faves.FavesList', {
	extend: 'Ext.List',
	alias: 'widget.faveslistview',
	requires: [
		'Ext.TitleBar',
		'Ext.dataview.List'
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
		store: 'favoritesstore',
		grouped: true,
		ui: 'round',
		itemId: 'favesList',
		loadingText: 'Loading Favorites...',
		emptyText: '<div class="faves-list-empty">No favorites to display <br><br> Use the Search screen to find genes, <br> phenotype terms, or disease terms. <br><br> Tap a gene or term to add it to your Favorites.</div>',
		itemTpl: Ext.create (
			'Ext.XTemplate',
			'<tpl for="."><div id="wrapper" class="list-master">',
				'<tpl if="origin == \'gf_results\'">',
					'<div class="gene-avatar" style="background-image: url({[values.state]})"></div>',
					'<h3 class="genes">{symbol:ellipsis(40, false)}</h3>',
					'<h4 class="genes">{name:ellipsis(60, false)}</h4>',
				'<tpl else>',
					'<div class="pheno-avatar" style="background-image: url({[values.state]})"></div>',
					'<h3 class="phenos">{term:ellipsis(40, false)}</h3>',
					'<h4 class="phenos">{type}</h4>',					
				'</tpl>',
			'</div></tpl>'
		),
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
						itemId: 'favesEditButton',
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
			{
				xtype: 'toolbar',
				itemId: 'favesEditToolbar',
				docked: 'bottom',
				hidden: true,
				items: [
					{ xtype: 'spacer' },
					{
						xtype: 'button',
						iconCls: 'trash',
						iconMask: true,
						itemId: 'favesEditTrashButton',
						iconAlign:'center',
						width:115,
						padding:0
					},
					{ xtype: 'spacer' }		
				]
			}
		], // list items
		listeners: {
			itemtap: function (list, index, target, record, event) {	
				setTimeout(function(){list.deselect(index);},150);
				this.fireEvent('assignFnCommand', this, record);
			},
			itemdoubletap: function (list, index, target, record, evt) {
				setTimeout(function(){list.deselect(index);},150);
				this.fireEvent('openFaveUrlCommand', this, record);
			}, // itemdoubletap
			initialize: function() {
				this.fireEvent('checkNumFavesCommand', this);
			}
		} // listeners
	} // config	
});


