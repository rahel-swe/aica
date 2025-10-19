import { Link, Outlet, useLoaderData } from 'react-router-dom';
import './App.css';

export const rootLoader = async () => {
  return { now: Date.now() };
};
function App() {
  const data = useLoaderData() as { now: number };

  return (
    <div>
      <header>
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/dashboard'}>Dashboard</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>Built at: {new Date(data.now).toLocaleString()}</footer>
    </div>
  );
}

export default App;
