Ext.define('GenomeCompass.view.Faves.FavesEdit', {
	extend: 'Ext.List',
	alias: 'widget.faveseditview',
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
		itemId: 'favesEditList',
		itemCls: 'list-item-custom',
		loadingText: 'Loading Favorites...',
		emptyText: '<div class="faves-list-empty">No Favorites to display</div>',
		itemTpl: Ext.create (
			'Ext.XTemplate',
			'<tpl for="."><div class="list-master">',
				'<tpl if="origin == \'gf_results\'">',
					'<div class="gene-avatar" style="background-image: url({[values.state]})"></div>',
					'<i><h3 class="genes">{symbol:ellipsis(33, false)}</h3></i>',
					'<h4 class="genes">{name:ellipsis(40, false)}</h4>',
				'<tpl else>',
					'<div class="pheno-avatar" style="background-image: url({[values.state]})"></div>',
					'<h3 class="phenos">{term:ellipsis(33, false)}</h3>',
					'<i><h4 class="phenos">{type}</h4></i>',					
				'</tpl>',
			'</div></tpl>'
		),
		items: [
			{
				xtype: 'toolbar',
				itemId: 'favesEditToolbar',
				docked: 'bottom',
				ui: 'light',
				hidden: true,
				items: [
					{
						xtype: 'button',
						itemId: 'favesEditTrashButton',
						text: 'Trash',
						centered: true,
						width: 100
					}
				]
			}
		], // end panel items
		listeners: {			
			itemtap: function (list, index, target, record, event) {		
				setTimeout(function(){list.deselect(index);},150);
				this.fireEvent('changeTheBoxCommand', this, record);
			}
		} // listeners
	}, // config
	initialize: function(){
		this.callParent();
	}
});







