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
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>MF Vitrina</h1>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <React.Suspense fallback={<div>Загрузка...</div>}>
            <SourceMF onSourceChange={setDataSource} />
            <ThemeMF onThemeChange={setTheme} />
          </React.Suspense>
        </div>
      </header>
      
      <main>
        <React.Suspense fallback={<div>Загрузка карточек...</div>}>
          <CardsMF dataSource={dataSource} />
        </React.Suspense>
      </main>
    </div>
  );
};

export default App;