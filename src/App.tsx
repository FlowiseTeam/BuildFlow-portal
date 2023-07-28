import { AppLayout } from '@layouts/AppLayout';
import { AppPage } from '@pages/app-page';
import { BDOPage } from '@pages/bdo-page';
import { EmployeesPage } from '@pages/employees-page';
import { ErrorPage } from '@pages/error-page';
import ProjectPage from '@pages/project-page';
import ProjectsPage from '@pages/projects-page';
import { VehiclesPage } from '@pages/vehicles-page';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { EmployeePage } from './pages/employee-page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from './components/queryBoundaries/ErrorBoundary';
import { NotificationProvider } from './layouts/notifications/NotificationProvider';

function Root() {
  return <Navigate to={'/app'} />;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <NotificationProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<AppPage />} />
                <Route path="vehicles" element={<VehiclesPage />} />
                <Route path="employees">
                  <Route index element={<EmployeesPage />} />
                  <Route path=":id" element={<EmployeePage />} />
                </Route>
                <Route path="bdo" element={<BDOPage />} />
                <Route path="projects">
                  <Route index element={<ProjectsPage />} />
                  <Route path=":id" element={<ProjectPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </NotificationProvider>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
