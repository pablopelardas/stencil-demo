import { newE2EPage } from '@stencil/core/testing';

describe.skip('yl-card-highlight', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<yl-card-highlight></yl-card-highlight>');

    const element = await page.find('yl-card-highlight');
    expect(element).toHaveClass('hydrated');
  });
});
