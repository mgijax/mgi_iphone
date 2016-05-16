Ext.define('GenomeCompass.view.Faves.FavesDetail', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.Toolbar',
		'Ext.form.FieldSet',
		'Ext.field.TextArea',
		'Ext.field.Toggle',
		'Ext.MessageBox'
	],
	alias: 'widget.favesdetailview',
	config: {
		id: 'favesdetailview',
		itemId: 'favesdetailview',
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
				docked: 'top',
				title: 'Detail Card',
				itemId: 'favesDetailTitlebar',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						//wp text: 'Back',
						iconCls: 'arrow-left',
						iconMask: true,
						iconAlign: 'center',
						itemId: 'favesDetailBackButton',
						align: 'left'
					},
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'lock',
						iconMask: true,
						iconAlign: 'center',
						itemId: 'favesDetailEditSaveButton',
						align: 'right'
					}
				] // titlebar items
			},
			{
				xtype: 'toolbar',
				itemId: 'favesDetailDeleteToolbar',
				docked: 'bottom',
				hidden: true,
				items: [
					{ xtype: 'spacer' },
					{
						xtype: 'button',
						iconCls: 'trash',
						iconMask: true,
						itemId: 'favesDetailDeleteButton',
						iconAlign:'center',
						width:115,
						padding:0
					},
					{ xtype: 'spacer' }					
				] // toolbar items
			},
			{
				xtype: 'panel',
				itemId: 'favesDetailDataPanel',
				items: [
					{
						xtype: 'panel',
						items: [
							{
								xtype: 'fieldset',
								itemId: 'favesDetailAnnotData',
								defaults: {
									labelWidth: '35%'
								},
								items: [
									{
										xtype: 'textfield',
										itemId: 'favesDetailSymbolField',
										name: 'symbol',
										label: 'Symbol',
										readOnly: true
									},
									{
										xtype: 'textareafield',
										itemId: 'favesDetailNameField',
										cls: 'name-term-field',
										labelCls: 'field-label-center',
										name: 'name',
										label: 'Name',
										readOnly: true				
									},
									{
										xtype: 'textareafield',
										itemId: 'favesDetailTermField',
										cls: 'name-term-field',
										labelCls: 'field-label-center',
										name: 'term',
										label: 'Term',
										readOnly: true
									},		
									{
										xtype: 'textfield',
										itemId: 'favesDetailFeatureTypeField',
										name: 'feature_type',
										label: 'Feature Type',
										labelWrap: true,
										readOnly: true				
									},
									{
										xtype: 'textfield',
										itemId: 'favesDetailLocationField',
										name: 'location',
										label: 'Location (NCBI B38)',
										readOnly: true,
										labelWrap: true
									},
									{
										xtype: 'textfield',
										itemId: 'favesDetailIdField',
										name: 'mgiId',
										label: 'MGI ID',
										readOnly: true				
									},
									{
										xtype: 'textfield',
										itemId: 'favesDetailUserLabelField',
										name: 'user_label',
										label: 'Labels',
										disabled: true
									},
									{
										xtype: 'textareafield',
										itemId: 'favesDetailNotesField',
										name: 'notes',
										label: 'Notes',
										disabled: true,
										listeners: {
											afterrender: function(field) {
												var TEXTAREA_LINE_HEIGHT = 20;
												var textarea = field.fieldEl.dom;
												var newHeight = textarea.scrollHeight;
												var currentHeight = textarea.clientHeight;
						
												if (newHeight > currentHeight) {
													textarea.style.height = newHeight + 5 * TEXTAREA_LINE_HEIGHT + 'px';
												}
											}
										}
									},
									{
										xtype: 'textfield',
										itemId: 'favesDetailDateAddedField',
										name: 'date_created',
										dateFormat: "D M j, Y",
										label: 'Created',
										readOnly: true
									},
									{ xtype: 'spacer' }	,
									{
										xtype: 'button',
										itemId: 'favesDetailViewMgiButton',
										text: 'View in MGI',
										height: 30
									}				
								] // fieldset items
							}		
						] // end of data panel items
					}, // end of data panel
					{
						xtype: 'panel',
						items: [
							{
								xtype: 'fieldset',
								itemId: 'favesDetailAnnotData',
								defaults: {
									labelWidth: '65%'
								},
								items: [
									{
										xtype: 'toolbar',
										title: 'Notification Preferences',
										docked: 'top',
										ui: 'light'
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewRefToggle',
										labelCls: 'field-label-center',
										name: 'pref_newRef',
										label: 'New References',
										labelWrap: true,
										disabled: true
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewAlleleToggle',	
										labelCls: 'field-label-center',													
										name: 'pref_newAllele',
										label: 'New Alleles',
										labelWrap: true,
										disabled: true						
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewDiseaseAssocToggle',
										labelCls: 'field-label-center',						
										name: 'pref_newDiseaseAssoc',
										label: 'New Human Disease Annotations',
										labelWrap: true,
										disabled: true						
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewPhenoAssocToggle',	
										labelCls: 'field-label-center',													
										name: 'pref_newPhenoAssoc',
										label: 'New Mouse Phenotype (MP) Annotations',
										labelWrap: true,
										disabled: true						
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewGoTermsToggle',
										labelCls: 'field-label-center',						
										name: 'pref_newGoTerm',
										label: 'New Functional Annotations',
										labelWrap: true,
										disabled: true						
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewGeneAssocToggle',
										labelCls: 'field-label-center',						
										name: 'pref_newGeneAssoc',
										label: 'New Gene Associations',
										labelWrap: true,
										disabled: true						
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewAlleleAssocToggle',
										labelCls: 'field-label-center',						
										name: 'pref_newAlleleAssoc',
										label: 'New Phenotypic Alleles',
										labelWrap: true,
										disabled: true						
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNewGenotypeAssocToggle',
										labelCls: 'field-label-center',						
										name: 'pref_newGenotypeAssoc',
										label: 'New Disease Models',
										labelWrap: true,
										disabled: true						
									},
									{
										xtype: 'togglefield',
										itemId: 'favesDetailNomenChangeToggle',
										labelCls: 'field-label-center',						
										name: 'pref_nomenChange',
										label: 'Nomenclature Changes',
										labelWrap: true,
										disabled: true						
									}
								] // fieldset items
							}		
						] // end of data panel items
					} // end of data panel
				] // end of favesDetailDataPanel items
			} // end of favesDetailDataPanel
		], // form panel items
		listeners: [
			{
				delegate: '#favesDetailBackButton',
				event: 'tap',
				fn: 'onFavesDetailBackButtonTap'
			},
			{
				delegate: '#favesDetailEditSaveButton',
				event: 'tap',
				fn: 'onFavesDetailEditSaveButtonTap'
			},
			{
				delegate: '#favesDetailDeleteButton',
				event: 'tap',
				fn: 'onFavesDetailDeleteButtonTap'
			},
			{
				delegate: '#favesDetailViewMgiButton',
				event: 'tap',
				fn: 'onFavesDetailViewMgiButtonTap'
			}
		] // listeners		
	}, // config
	onFavesDetailBackButtonTap: function () {
		this.fireEvent('backToFavesListCommand', this);
	}, // onFaveDetailBackButtonTap
	onFavesDetailEditSaveButtonTap: function (list, record, target, index, evt, options) {
		this.fireEvent('editSaveFavesDetailCommand', this, record);
	}, // onFaveDetailSaveButtonTap	
	onFavesDetailDeleteButtonTap: function (list, record, target, index, evt, options) {
		this.fireEvent('showTrashConfirmCommand', 'favesdetail', record);
	}, // onFavesListDisclose
	onFavesDetailViewMgiButtonTap: function (record) {
		this.fireEvent('viewMgiCommand');
	}
});





















