import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Quote } from './types.js';

@customElement('quote-card')
export class QuoteCard extends LitElement {
  @property({ type: Object }) quote!: Quote;

  static styles = css`
    :host {
      display: block;
      padding: 1.5rem;
      background: var(--card-bg, #ffffff);
      border: 1px solid var(--card-border, #e0e0e0);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    :host(:hover) {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .quote-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text, #000000);
      margin-bottom: 1rem;
      font-style: italic;
    }

    .quote-author {
      font-size: 0.9rem;
      color: var(--text-secondary, #666666);
      text-align: right;
      font-weight: 500;
    }
  `;

  // отключаем Shadow DOM для наследования CSS переменных
  createRenderRoot() {
    return this;
  }

  render() {
    if (!this.quote) return html``;
    
    return html`
      <div class="quote-text">"${this.quote.quote}"</div>
      <div class="quote-author">— ${this.quote.author}</div>
    `;
  }
}