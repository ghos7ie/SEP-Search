import { ColorScheme, ColorSchemeProvider, MantineProvider, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import HeaderBar from './components/Header';
import SearchContextProvider from './context/SearchContext';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <SearchContextProvider>
          <HeaderBar />
        </SearchContextProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}