import React, { useState, useEffect, useRef } from 'react';
import type { DataSource, Quote, Todo } from 'shared-components/types';
import { DataService } from './services/DataService';

// импортируем Web Components (они регистрируются автоматически)
import 'shared-components/quote-card.js';
import 'shared-components/todo-card.js';

// проверяем, что компоненты зарегистрированы
console.log('quote-card defined:', customElements.get('quote-card') !== undefined);
console.log('todo-card defined:', customElements.get('todo-card') !== undefined);

interface CardsListProps {
  dataSource?: DataSource;
}

// обёртки для Web Components с правильной передачей props через ref
const QuoteCardWrapper: React.FC<{ quote: Quote }> = ({ quote }) => {
  const ref = useRef<any>(null);
  
  useEffect(() => {
    if (ref.current && quote) {
      ref.current.quote = quote;
    }
  }, [quote]);
  
  return <quote-card ref={ref} />;
};

const TodoCardWrapper: React.FC<{ todo: Todo }> = ({ todo }) => {
  const ref = useRef<any>(null);
  
  useEffect(() => {
    if (ref.current && todo) {
      ref.current.todo = todo;
    }
  }, [todo]);
  
  return <todo-card ref={ref} />;
};

const CardsList: React.FC<CardsListProps> = ({ dataSource: propDataSource }) => {
  const [items, setItems] = useState<(Quote | Todo)[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>(
    propDataSource || 'quotes'
  );

  const itemsPerPage = DataService.getItemsPerPage();
  const totalPages = Math.ceil(total / itemsPerPage);

  // слушаем Custom Events для фреймворк-агностичной коммуникации
  useEffect(() => {
    const handleSourceChange = (e: Event) => {
      const customEvent = e as CustomEvent<DataSource>;
      setDataSource(customEvent.detail);
      setCurrentPage(0);
    };

    window.addEventListener('source-change', handleSourceChange as EventListener);
    
    return () => {
      window.removeEventListener('source-change', handleSourceChange as EventListener);
    };
  }, []);

  // поддержка React props для обратной совместимости
  useEffect(() => {
    if (propDataSource) {
      setDataSource(propDataSource);
      setCurrentPage(0);
    }
  }, [propDataSource]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Loading data for source:', dataSource, 'page:', currentPage);
        if (dataSource === 'quotes') {
          const response = await DataService.fetchQuotes(currentPage);
          console.log('Quotes response:', response);
          setTotal(response.total);
          setItems(response.quotes || []);
        } else {
          const response = await DataService.fetchTodos(currentPage);
          console.log('Todos response:', response);
          setTotal(response.total);
          setItems(response.todos || []);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataSource, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '2rem' }}>Ошибка: {error}</div>;
  }

  return (
    <div>
      <div style={{ 
        marginBottom: '1.5rem', 
        color: 'var(--text-secondary, #666666)',
        fontSize: '0.9rem'
      }}>
        Всего элементов: {total} | Страница {currentPage + 1} из {totalPages || 1}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {items.map((item) => {
          if (dataSource === 'quotes') {
            return <QuoteCardWrapper key={item.id} quote={item as Quote} />;
          } else {
            return <TodoCardWrapper key={item.id} todo={item as Todo} />;
          }
        })}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: '1px solid var(--card-border, #e0e0e0)',
            borderRadius: '6px',
            background: currentPage === 0 
              ? 'var(--badge-bg, #f0f0f0)' 
              : 'var(--primary-color, #007bff)',
            color: currentPage === 0 
              ? 'var(--text-secondary, #666666)' 
              : '#ffffff',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 0 ? 0.6 : 1,
          }}
        >
          Предыдущая
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: '1px solid var(--card-border, #e0e0e0)',
            borderRadius: '6px',
            background: currentPage >= totalPages - 1
              ? 'var(--badge-bg, #f0f0f0)'
              : 'var(--primary-color, #007bff)',
            color: currentPage >= totalPages - 1
              ? 'var(--text-secondary, #666666)'
              : '#ffffff',
            cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage >= totalPages - 1 ? 0.6 : 1,
          }}
        >
          Следующая
        </button>
      </div>
    </div>
  );
};

export default CardsList;