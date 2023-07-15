import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import ResponsiveAppBar from './components/AppBar';

// Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import FAQ from './routes/FAQ';
import { PUContextProvider } from './context/PUContext';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#557076',
      },
      secondary: {
        main: '#df7db7',
      },
      background: {
        default: '#1c202b',
        paper: '#282c36',
      },
      shape: {
        // i actually can't tell if this did anything
        borderRadius: 100,
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <PUContextProvider>
          <CssBaseline />
          <ResponsiveAppBar />
          <Container maxWidth="xl" >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/faq" element={<FAQ />} />
            </Routes>
          </Container>
        </PUContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
