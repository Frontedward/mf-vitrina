import type { Quote, Todo } from 'shared-components/types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'quote-card': {
        ref?: React.Ref<any>;
        quote?: Quote;
        theme?: Theme;
      };
      'todo-card': {
        ref?: React.Ref<any>;
        todo?: Todo;
        theme?: Theme;
      };
    }
  }
}

export {};