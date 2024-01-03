
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {

  const router = useRoutes(routes)

  return (
    <h1>{router}</h1>
  );
}

export default App;
