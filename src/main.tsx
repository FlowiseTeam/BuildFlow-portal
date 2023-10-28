import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import { mockMirageServer } from './mirage/mirageMockServer';
import { PROJECTS_API_URL, API_URL } from './services/api/index';

import './index.css';
import { VEHICLES_API_URL } from './services/api/setup';

if (import.meta.env.MODE === 'development') {
  mockMirageServer(PROJECTS_API_URL, API_URL, VEHICLES_API_URL);
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
