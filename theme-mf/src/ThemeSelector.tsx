import React, { useEffect } from 'react';
import type { Theme } from 'shared-components/types';

interface ThemeSelectorProps {
  onThemeChange?: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = React.useState<Theme>('light');

  useEffect(() => {
    // отправляем событие при монтировании
    const event = new CustomEvent<Theme>('theme-change', {
      detail: selectedTheme,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value as Theme;
    setSelectedTheme(theme);
    
    // отправляем Custom Event для фреймворк-агностичной коммуникации
    const event = new CustomEvent<Theme>('theme-change', {
      detail: theme,
      bubbles: true,
    });
    window.dispatchEvent(event);
    
    // поддержка React props для обратной совместимости
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor="theme-select" style={{ 
        fontSize: '0.9rem', 
        color: 'var(--text-secondary, #666666)',
        fontWeight: '500'
      }}>
        Тема оформления:
      </label>
      <select
        id="theme-select"
        value={selectedTheme}
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
        <option value="light">День</option>
        <option value="dark">Ночь</option>
      </select>
    </div>
  );
};

export default ThemeSelector;