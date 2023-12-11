import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import './App.css';
import Page from './components/Page';
import { AppProvider } from './contexts/AppContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppProvider>
        <Container component="main" maxWidth='md'>
          <Page />
        </Container>
      </AppProvider>

    </ThemeProvider>
  );
}

export default App;
