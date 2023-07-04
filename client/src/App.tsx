import { ColorScheme, ColorSchemeProvider, MantineProvider, Text } from '@mantine/core';
import ThemeButton from "./components/ThemeButton";
import { useLocalStorage } from '@mantine/hooks';
import HeaderBar from './components/Header';

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
        <HeaderBar />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}