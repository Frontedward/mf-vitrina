import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Quote, Theme } from './types.js';

@customElement('quote-card')
export class QuoteCard extends LitElement {
  @property({ type: Object }) quote!: Quote;
  @property({ type: String }) theme: Theme = 'light';

  static styles = css`
    :host {
      display: block;
      padding: 1.5rem;
      background: var(--card-bg, #ffffff);
      border: 1px solid var(--card-border, #e0e0e0);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s, box-shadow 0.2s;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    :host(:hover) {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex-grow: 1;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text, #000000);
      line-height: 1.3;
    }

    .quote-text {
      font-size: 1rem;
      color: var(--text, #000000);
      line-height: 1.6;
      margin-bottom: 1rem;
      font-style: italic;
    }

    .author {
      font-size: 0.9rem;
      color: var(--text-secondary, #666666);
      text-align: right;
      font-weight: 500;
    }
  `;

  render() {
    if (!this.quote) return html``;

    return html`
      <div class="content">
        <div class="title">Quote</div>
        <div class="quote-text">"${this.quote.quote}"</div>
        <div class="author">— ${this.quote.author}</div>
      </div>
    `;
  }
}