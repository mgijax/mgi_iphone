Ext.define('GenomeCompass.model.Favorite', {
	extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		fields: [
			{ name: 'mgiId', type: 'auto' },
			{ name: 'symbol', type: 'auto' },
			{ name: 'supTxt', type: 'auto' },
			{ name: 'name', type: 'auto' },
			{ name: 'term', type: 'auto' },
			{ name: 'label', type: 'auto' },			
			{ name: 'url', type: 'auto' },
			{ name: 'type', type: 'auto' },
			{ name: 'key', type: 'auto' },
			{ name: 'feature_type', type: 'auto' },
			{ name: 'chr', type: 'auto' },
			{ name: 'coords', type: 'auto' },
			{ name: 'location', type: 'auto' },			
			{ name: 'origin', type: 'auto' },
			{ name: 'disp_filter', type: 'auto' },
			{ name: 'group_index', type: 'auto' },
			{ name: 'date_created', type: 'date', dateFormat: 'D M j, Y' },
			{ name: 'user_label', type: 'auto' },
			{ name: 'notes', type: 'string' },
			{ name: 'state', type: 'string', defaultValue: 'resources/images/iconmonstr-unchecked.svg' },
			{ name: 'pref_newRef', type: 'auto' },
			{ name: 'pref_newAllele', type: 'auto' },
			{ name: 'pref_newPhenoAssoc', type: 'auto' },
			{ name: 'pref_newDiseaseAssoc', type: 'auto' },
			{ name: 'pref_newGoTerm', type: 'auto' },
			{ name: 'pref_nomenChange', type: 'auto' },
			{ name: 'pref_newGeneAssoc', type: 'auto' },
			{ name: 'pref_newAlleleAssoc', type: 'auto' },
			{ name: 'pref_newGenotypeAssoc', type: 'auto' },
			{ name: 'type_count', type: 'auto' }
		], // fields
		validations: [
			{ type: 'presence', field: 'mgiId', message: 'Uh-oh, this record doesn\'t have an MGI ID.' }
		] // validations
	} // config
});