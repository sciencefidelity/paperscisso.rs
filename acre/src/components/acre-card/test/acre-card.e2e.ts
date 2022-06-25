import { newE2EPage } from '@stencil/core/testing';

describe('acre-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acre-card></acre-card>');

    const element = await page.find('acre-card');
    expect(element).toHaveClass('hydrated');
  });
});
