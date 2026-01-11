import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Todo, Theme } from './types.js';

@customElement('todo-card')
export class TodoCard extends LitElement {
  @property({ type: Object }) todo!: Todo;
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
      min-height: 160px;
      display: flex;
      flex-direction: column;
    }

    :host(:hover) {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .content {
      padding: 1rem;
    }

    .title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text, #000000);
      margin-bottom: 0.5rem;
    }

    .id {
      font-size: 0.85rem;
      color: var(--text-secondary, #666666);
      margin-bottom: 1rem;
    }

    .todo-text {
      font-size: 1.05rem;
      color: var(--text, #000000);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .todo-text.completed {
      text-decoration: line-through;
      opacity: 0.7;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.9rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      color: white;
    }

    .status-badge.completed {
      background: #4caf50;
    }

    .status-badge.pending {
      background: #ff9800;
    }
  `;

  render() {
    if (!this.todo) return html``;

    const status = this.todo.completed ? 'completed' : 'pending';
    const icon = this.todo.completed ? '✅' : '🕗';

    return html`
    <div class="content">  
      <div class="title">Todo</div>
      <div class="id">ID: ${this.todo.id}</div>
      <div class="todo-text ${status}">
        ${this.todo.todo}
      </div>
      <div class="footer">
        <div class="status-badge ${status}">
          <span>${icon}</span>
          <span>${status}</span>
        </div>
      </div>
    </div>
    `;
  }
}