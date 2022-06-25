import { newSpecPage } from '@stencil/core/testing';
import { AcreCard } from '../acre-card';

describe('acre-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcreCard],
      html: `<acre-card></acre-card>`,
    });
    expect(page.root).toEqualHtml(`
      <acre-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acre-card>
    `);
  });
});
