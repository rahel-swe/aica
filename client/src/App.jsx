import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from './components/ui/button';
import { Binary, User } from 'lucide-react';
import Auth from './components/auth/Auth';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Auth />
    </>
  );
}

export default App;
