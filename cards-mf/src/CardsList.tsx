import React, { useState, useEffect, useRef } from 'react';
import type { DataSource, Quote, Todo, Theme } from 'shared-components/types';
import { DataService } from './services/DataService';

import 'shared-components/quote-card.js';
import 'shared-components/todo-card.js';

interface CardsListProps {
  dataSource?: DataSource;
  theme?: Theme;
}

// обёртки с передачей темы
const QuoteCardWrapper: React.FC<{ quote: Quote; theme: Theme }> = ({ quote, theme }) => {
  const ref = useRef<any>(null);
  
  useEffect(() => {
    if (ref.current) {
      ref.current.quote = quote;
      ref.current.theme = theme;
    }
  }, [quote, theme]);
  
  return <quote-card ref={ref} />;
};

const TodoCardWrapper: React.FC<{ todo: Todo; theme: Theme }> = ({ todo, theme }) => {
  const ref = useRef<any>(null);
  
  useEffect(() => {
    if (ref.current) {
      ref.current.todo = todo;
      ref.current.theme = theme;
    }
  }, [todo, theme]);
  
  return <todo-card ref={ref} />;
};

const CardsList: React.FC<CardsListProps> = ({ dataSource: propDataSource, theme: propTheme }) => {
  const [items, setItems] = useState<(Quote | Todo)[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>(
    propDataSource || 'quotes'
  );
  const [theme, setTheme] = useState<Theme>(propTheme || 'light');

  const itemsPerPage = DataService.getItemsPerPage();
  const totalPages = Math.ceil(total / itemsPerPage);

  // слушаем Custom Events для фреймворк-агностичной коммуникации
  useEffect(() => {
    const handleSourceChange = (e: Event) => {
      const customEvent = e as CustomEvent<DataSource>;
      setDataSource(customEvent.detail);
      setCurrentPage(0);
    };

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      setTheme(customEvent.detail);
    };

    window.addEventListener('source-change', handleSourceChange as EventListener);
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('source-change', handleSourceChange as EventListener);
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
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
    if (propTheme) {
      setTheme(propTheme);
    }
  }, [propTheme]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (dataSource === 'quotes') {
          const response = await DataService.fetchQuotes(currentPage);
          setTotal(response.total);
          setItems(response.quotes || []);
        } else {
          const response = await DataService.fetchTodos(currentPage);
          setTotal(response.total);
          setItems(response.todos || []);
        }
      } catch (err) {
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
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1.5rem',
        marginBottom: '2rem',
        padding: '0.5rem',        
      }}>
        {items.map((item) => {
          if (dataSource === 'quotes') {
            return <QuoteCardWrapper key={item.id} quote={item as Quote} theme={theme} />;
          } else {
            return <TodoCardWrapper key={item.id} todo={item as Todo} theme={theme} />;
          }
        })}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 0',
      }}>
        <span style={{ 
          color: 'var(--text-secondary, #666666)',
          fontSize: '0.9rem',
          marginRight: '1rem',
        }}>
          Страница {currentPage + 1} из {totalPages || 1}
        </span>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            background: currentPage === 0 
              ? 'var(--badge-bg, #f0f0f0)' 
              : 'var(--primary-color, #007bff)',
            color: currentPage === 0 
              ? 'var(--text-secondary, #666666)' 
              : '#ffffff',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 0 ? 0.6 : 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
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
            border: 'none',
            borderRadius: '6px',
            background: currentPage >= totalPages - 1
              ? 'var(--badge-bg, #f0f0f0)'
              : 'var(--primary-color, #007bff)',
            color: currentPage >= totalPages - 1
              ? 'var(--text-secondary, #666666)'
              : '#ffffff',
            cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage >= totalPages - 1 ? 0.6 : 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          Следующая
        </button>
        <span style={{ 
          color: 'var(--text-secondary, #666666)',
          fontSize: '0.9rem',
          marginLeft: '1rem'
        }}>
          Всего элементов: {total}
        </span>
      </div>
    </div>
  );
};

export default CardsList;