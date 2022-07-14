import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

@customElement("rainbow-square")
export class RainbowSquare extends LitElement {
  squares = Array.from(Array(10).keys());

  render() {
    return html`<div id="canvas">
      ${map(
        this.squares,
        (square) => html` <div
          class="square-${square}"
          style=${`
            width: ${square * 11.111111}%;
            background: var(--color-${square});
            z-index: ${-square};
          `}
        ></div>`
      )}
    </div>`;
  }

  static styles = css`
    #canvas {
      display: grid;
      height: 60vh;
      aspect-ratio: 1;
      position: relative;
    }
    #canvas > div {
      aspect-ratio: 1;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "rainbow-square": RainbowSquare;
  }
}
