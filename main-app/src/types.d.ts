declare module 'source_mf/SourceSelector' {
    import { ComponentType } from 'react';
    import type { DataSource } from 'shared-components/types';
    
    interface SourceSelectorProps {
      onSourceChange?: (source: DataSource) => void;
    }
    
    const SourceSelector: ComponentType<SourceSelectorProps>;
    export default SourceSelector;
  }
  
  declare module 'theme_mf/ThemeSelector' {
    import { ComponentType } from 'react';
    import type { Theme } from 'shared-components/types';
    
    interface ThemeSelectorProps {
      onThemeChange?: (theme: Theme) => void;
    }
    
    const ThemeSelector: ComponentType<ThemeSelectorProps>;
    export default ThemeSelector;
  }
  
  declare module 'cards_mf/CardsList' {
    import { ComponentType } from 'react';
    import type { DataSource } from 'shared-components/types';
    
    interface CardsListProps {
      dataSource?: DataSource;
      theme?: Theme;
    }
    
    const CardsList: ComponentType<CardsListProps>;
    export default CardsList;
  }