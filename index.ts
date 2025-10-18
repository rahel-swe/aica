import concurrently from 'concurrently';

concurrently([
  {
    name: 'SERVER',
    command: 'npm run dev',
    cwd: 'server',
    prefixColor: 'cyan',
  },
  {
    name: 'CLIENT',
    command: 'npm run dev',
    cwd: 'client',
    prefixColor: 'green',
  },
  {
    name: 'AI',
    command: 'python app.py',
    cwd: 'ai',
    prefixColor: 'magenta',
  },
]);
