import { Link, Outlet, useLoaderData } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'

export const rootLoader = async () => {
  return { now: Date.now() }
}
function App () {
  const data = useLoaderData() as { now: number }

  return (
    <div>
      <header>
        <nav>
          <Button variant='link'>
            <Link to={'/app'}>Home</Link>
          </Button>
          <Button variant='link'>
            <Link to={'/app/dashboard'}>Dashboard</Link>
          </Button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>Built at: {new Date(data.now).toLocaleString()}</footer>
    </div>
  )
}

export default App
