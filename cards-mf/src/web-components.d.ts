import type { Quote, Todo } from 'shared-components/types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'quote-card': {
        ref?: React.Ref<any>;
        quote?: Quote;
      };
      'todo-card': {
        ref?: React.Ref<any>;
        todo?: Todo;
      };
    }
  }
}

export {};