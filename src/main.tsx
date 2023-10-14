import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { mockMirageServer } from './mirage/mirageMockServer';
import { PROJECTS_API_URL, API_URL } from './services/api/index';

if (import.meta.env.MODE === 'development') {
  mockMirageServer(PROJECTS_API_URL, API_URL);
}

console.warn(import.meta.env.MODE);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
