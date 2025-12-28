import React, { useState, useEffect } from 'react';
import type { DataSource, Theme } from 'shared-components/types';

const SourceMF = React.lazy(() => import('source_mf/SourceSelector'));
const ThemeMF = React.lazy(() => import('theme_mf/ThemeSelector'));
const CardsMF = React.lazy(() => import('cards_mf/CardsList'));

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSource>('quotes');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.setAttribute('main-theme', theme);
  }, [theme]);

  // слушаем Custom Events для фреймворк-агностичной коммуникации
  useEffect(() => {
    const handleSourceChange = (e: Event) => {
      const customEvent = e as CustomEvent<DataSource>;
      setDataSource(customEvent.detail);
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

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
    }}>
      {/* Основная карточка приложения */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        background: 'var(--bg, #ffffff)',
        // border: '1px solid var(--card-border, #e0e0e0)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Заголовок карточки */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--card-border, #e0e0e0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--card-bg, #ffffff)',
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 600,
            color: 'var(--text, #000000)',
          }}>
            MF Vitrina
          </h1>
          <button
            onClick={() => alert('Закрыть')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text, #000000)',
              padding: '0.5rem',
              borderRadius: '50%',
            }}
          >
            ×
          </button>
        </div>

        {/* Контрольная панель */}
        <div style={{
          padding: '1.5rem 2rem',
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          borderBottom: '1px solid var(--card-border, #e0e0e0)',
          backgroundColor: 'var(--card-bg, #ffffff)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--badge-bg, #f0f0f0)',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            minWidth: '200px',
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #666666)' }}>Источник:</span>
            <React.Suspense fallback={<span>...</span>}>
              <SourceMF onSourceChange={setDataSource} />
            </React.Suspense>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--badge-bg, #f0f0f0)',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            minWidth: '150px',
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #666666)' }}>Тема:</span>
            <React.Suspense fallback={<span>...</span>}>
              <ThemeMF onThemeChange={setTheme} />
            </React.Suspense>
          </div>
        </div>

        {/* Контент карточек */}
        <div style={{
          padding: '2rem',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <React.Suspense fallback={<div>Загрузка карточек...</div>}>
            <CardsMF dataSource={dataSource} theme={theme} />
          </React.Suspense>
        </div>

        {/* Подвал */}
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid var(--card-border, #e0e0e0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--card-bg, #ffffff)',
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #666666)' }}>
            Micro-Frontend Vitrina Demo v1.0 | @frontedward
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;