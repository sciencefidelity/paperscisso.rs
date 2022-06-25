import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'acre-clock',
  styleUrl: 'acre-clock.css',
  shadow: true,
})
export class AcreClock {
  timer: number;

  @State() currentTime: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.currentTime).toLocaleTimeString();

    return <div>{time}</div>;
  }
}
