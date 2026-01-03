import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
]);

