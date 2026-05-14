import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import Dcandidates from './components/DCandidates';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesThemeProvider theme={theme}>
          <div className="App">
            <Dcandidates />
            <ToastContainer autoClose={3000} />
          </div>
        </StylesThemeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
