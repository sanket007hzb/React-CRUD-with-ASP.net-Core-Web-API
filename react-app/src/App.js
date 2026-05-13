import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import Dcandidates from './components/DCandidates';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesThemeProvider theme={theme}>
          <div className="App">
            <Dcandidates />
          </div>
        </StylesThemeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
