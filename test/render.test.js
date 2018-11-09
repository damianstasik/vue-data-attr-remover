const render = require('./render');

describe('render', () => {
  it('should render an empty div', async () => {
    expect(await render('<div></div>')).toEqual('<div></div>');
  });

  it('should render an empty div that has `data-test` attribute', async () => {
    expect(await render('<div data-test="something"></div>')).toEqual('<div data-test="something"></div>');
  });

  it('should render nested `div` in another `div` where both should have proper `data-test` attributes', async () => {
    const template = '<div data-test="something"><div data-test="something-else"></div></div>';

    expect(await render(template)).toEqual(template);
  });
});
