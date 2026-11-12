import { leafKey, searchLeaves } from '#lib/utils/leaf.utils.ts';

const keys = (query: string): string[] => searchLeaves({ query, locale: 'en' }).map(leafKey);

describe('searchLeaves', () => {
	it('finds a language spoken by its English and Italian names', () => {
		expect(keys('italian')).toContain('language:it');
		expect(keys('Portoghese')).toContain('language:pt');
	});

	it('finds an about item by its English and Italian titles', () => {
		expect(keys('still an engineer')).toContain('about:ai-native');
		expect(keys('ingegnere')).toContain('about:ai-native');
	});

	it('does not match the Portuguese text', () => {
		expect(keys('ainda engenheiro')).toEqual([]);
	});

	it('labels each match in the visitor locale', () => {
		expect(searchLeaves({ query: 'italian', locale: 'it' })).toContainEqual({
			kind: 'language',
			id: 'it',
			label: 'Italiano'
		});
	});

	it('finds nothing for an empty query', () => {
		expect(keys('   ')).toEqual([]);
	});
});
