import { BrowserRouter } from 'react-router-dom'
import Main from './hooks/Main';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Main/>
      </div>
    </BrowserRouter>

  );
}

export default App;
