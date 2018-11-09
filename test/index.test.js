const render = require('./render');
const removeDataAttrModule = require('../index');

describe('removeDataAttrModule', () => {
  it('should not remove any data attribute due to not meet default `condition`', async () => {
    const modules = [removeDataAttrModule()];

    let result = await render('<div data-test="something"></div>', modules);
    expect(result).toEqual('<div data-test="something"></div>');

    result = await render('<div data-test-id></div>', modules);
    expect(result).toEqual('<div data-test-id=""></div>');

    result = await render('<div data-test="something" data-test-id></div>', modules);
    expect(result).toEqual('<div data-test="something" data-test-id=""></div>');
  });

  it('should remove `data-test` attribute due to always positive `condition`', async () => {
    const attrModule = removeDataAttrModule({
      condition: () => true,
    });

    const result = await render('<div data-test="something"></div>', [attrModule]);
    expect(result).toEqual('<div></div>');
  });

  it('should not remove `data-test-id` attribute due to `onlyExactAttrName` set to `true` by default', async () => {
    const attrModule = removeDataAttrModule({
      condition: () => true,
    });

    const result = await render('<div data-test-id></div>', [attrModule]);
    expect(result).toEqual('<div data-test-id=""></div>');
  });

  it('should remove both `data-test` and `data-test-id` attributes', async () => {
    const attrModule = removeDataAttrModule({
      condition: () => true,
      onlyExactAttrName: false,
    });

    let result = await render('<div data-test-id></div>', [attrModule]);
    expect(result).toEqual('<div></div>');

    result = await render('<div data-test></div>', [attrModule]);
    expect(result).toEqual('<div></div>');

    result = await render('<div data-test data-test-id data-test-id-2></div>', [attrModule]);
    expect(result).toEqual('<div></div>');
  });

  it('should remove `data-test` attribute only if attribute `data-always` is available', async () => {
    const attrModule = removeDataAttrModule({
      condition: ({ attrs }) => attrs['data-always'] !== undefined,
    });

    let result = await render('<div data-test="something"></div>', [attrModule]);
    expect(result).toEqual('<div data-test="something"></div>');

    result = await render('<div data-test="something" data-always></div>', [attrModule]);
    expect(result).toEqual('<div data-always=""></div>');
  });

  it('should remove `data-test` attribute only if HTML tag is `p`', async () => {
    const attrModule = removeDataAttrModule({
      condition: ({ tag }) => tag === 'p',
    });

    let result = await render('<p data-test="something"></p>', [attrModule]);
    expect(result).toEqual('<p></p>');

    result = await render('<div data-test="something"></div>', [attrModule]);
    expect(result).toEqual('<div data-test="something"></div>');
  });

  it('should remove `data-attr` attribute only', async () => {
    const attrModule = removeDataAttrModule({
      condition: () => true,
      attrNameSuffix: 'attr',
    });

    let result = await render('<div data-attr></div>', [attrModule]);
    expect(result).toEqual('<div></div>');

    result = await render('<div data-attr data-test></div>', [attrModule]);
    expect(result).toEqual('<div data-test=""></div>');
  });
});
