import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'acre-card',
  styleUrl: 'acre-card.css',
  shadow: true,
})
export class AcreCard {

  render() {
    return (
      <Host>
        <div class="card">
          <slot></slot>
        </div>
      </Host>
    );
  }

}
