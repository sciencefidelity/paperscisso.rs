import { newE2EPage } from '@stencil/core/testing';

describe('acre-clock', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acre-clock></acre-clock>');

    const element = await page.find('acre-clock');
    expect(element).toHaveClass('hydrated');
  });
});
