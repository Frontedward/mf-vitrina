// структура цитаты из https://dummyjson.com/quotes
export interface Quote {
  id: number;
  quote: string;
  author: string;
}
  
// структура задачи из https://dummyjson.com/todos
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
 
// два отдельных типа ответа:
export interface QuotesResponse {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}
  
export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
  
// тип источника данных (выбор пользователя)
export type DataSource = 'quotes' | 'todos';
  
// тип темы
export type Theme = 'light' | 'dark';