import { BrowserRouter } from 'react-router-dom'
import Main from './hooks/Main';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { AnnouncementProvider } from './components/Announcement/AnnouncementContext'

function App() {
  return (
    <BrowserRouter>
      <AnnouncementProvider>
        <div>
          <Main />
        </div>
      </AnnouncementProvider>
    </BrowserRouter>

  );
}

export default App;
