import React, { useEffect } from 'react';
import type { DataSource } from 'shared-components/types';

interface SourceSelectorProps {
  onSourceChange?: (source: DataSource) => void;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({ onSourceChange }) => {
  const [selectedSource, setSelectedSource] = React.useState<DataSource>('quotes');

  useEffect(() => {
    // отправляем событие при монтировании
    const event = new CustomEvent<DataSource>('source-change', {
      detail: selectedSource,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const source = e.target.value as DataSource;
    setSelectedSource(source);
    
    // отправляем Custom Event для фреймворк-агностичной коммуникации
    const event = new CustomEvent<DataSource>('source-change', {
      detail: source,
      bubbles: true,
    });
    window.dispatchEvent(event);
    
    // поддержка React props для обратной совместимости
    if (onSourceChange) {
      onSourceChange(source);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor="source-select" style={{ 
        fontSize: '0.9rem', 
        color: 'var(--text-secondary, #666666)',
        fontWeight: '500'
      }}>
        Источник данных:
      </label>
      <select
        id="source-select"
        value={selectedSource}
        onChange={handleChange}
        style={{
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid var(--card-border, #e0e0e0)',
          borderRadius: '6px',
          background: 'var(--card-bg, #ffffff)',
          color: 'var(--text, #000000)',
          cursor: 'pointer',
          minWidth: '200px',
        }}
      >
        <option value="quotes">Цитаты</option>
        <option value="todos">Задачи</option>
      </select>
    </div>
  );
};

export default SourceSelector;