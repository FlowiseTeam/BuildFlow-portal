import { HashRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from './components/queryBoundaries/ErrorBoundary';
import { NotificationProvider } from './layouts/notifications/NotificationProvider';
import { Notifications } from './layouts/notifications/Notifications';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <NotificationProvider>
            <Notifications />
            <App />
          </NotificationProvider>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>,
);
