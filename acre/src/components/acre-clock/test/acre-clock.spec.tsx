import { newSpecPage } from '@stencil/core/testing';
import { AcreClock } from '../acre-clock';

describe('acre-clock', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcreClock],
      html: `<acre-clock></acre-clock>`,
    });
    expect(page.root).toEqualHtml(`
      <acre-clock>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acre-clock>
    `);
  });
});
