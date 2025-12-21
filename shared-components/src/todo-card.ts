import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Todo } from './types.js';

@customElement('todo-card')
export class TodoCard extends LitElement {
  @property({ type: Object }) todo!: Todo;

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

    .todo-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .todo-checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: var(--primary-color, #007bff);
    }

    .todo-text {
      flex: 1;
      font-size: 1rem;
      color: var(--text, #000000);
    }

    .todo-text.completed {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .todo-id {
      font-size: 0.85rem;
      color: var(--text-secondary, #666666);
      padding: 0.25rem 0.5rem;
      background: var(--badge-bg, #f0f0f0);
      border-radius: 4px;
    }
  `;

  // отключаем Shadow DOM для наследования CSS переменных
  createRenderRoot() {
    return this;
  }

  render() {
    if (!this.todo) return html``;
    
    return html`
      <div class="todo-content">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          .checked=${this.todo.completed}
          disabled
        />
        <span class="todo-text ${this.todo.completed ? 'completed' : ''}">
          ${this.todo.todo}
        </span>
        <span class="todo-id">ID: ${this.todo.id}</span>
      </div>
    `;
  }
}