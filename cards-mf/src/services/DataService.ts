import type { QuotesResponse, TodosResponse, DataSource } from 'shared-components/types';

const ITEMS_PER_PAGE = 3;
const INITIAL_SKIP = 10;

export class DataService {
  private static readonly BASE_URL = 'https://dummyjson.com';

  static async fetchQuotes(page: number = 0): Promise<QuotesResponse> {
    const skip = INITIAL_SKIP + (page * ITEMS_PER_PAGE);
    const url = `${this.BASE_URL}/quotes?limit=${ITEMS_PER_PAGE}&skip=${skip}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Не удалось получить цитаты.');
    }
    
    return await response.json();
  }

  static async fetchTodos(page: number = 0): Promise<TodosResponse> {
    const skip = INITIAL_SKIP + (page * ITEMS_PER_PAGE);
    const url = `${this.BASE_URL}/todos?limit=${ITEMS_PER_PAGE}&skip=${skip}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Не удалось получить список задач.');
    }
    
    return await response.json();
  }

  static getItemsPerPage(): number {
    return ITEMS_PER_PAGE;
  }
}