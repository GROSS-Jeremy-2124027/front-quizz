import './App.css';
import { Provider } from 'react-redux';
import Routes from "./router.js"
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
