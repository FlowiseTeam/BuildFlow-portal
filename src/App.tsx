import { AppLayout } from '@layouts/AppLayout';
import { AppPage } from '@pages/app-page';
import { EmployeesPage } from '@pages/employees-page';
import { ErrorPage } from '@pages/error-page';
import ProjectPage from '@pages/project-page';
import ProjectsPage from '@pages/projects-page';
import { VehiclesPage } from '@pages/vehicles-page';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { EmployeePage } from './pages/employee-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/queryBoundaries/ErrorBoundary';
import { NotificationProvider } from './layouts/notifications/NotificationProvider';
import VehiclePage from './pages/vehicle-page';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { KPOPage } from './pages/bdo/kpo/kpo-page';
import { KPOAddPage } from './pages/bdo/kpo/kpo-add-page';
import LoginPage from './pages/login-page';
import { SidebarProvider } from './components/sidebar/SidebarProvider';
import { AuthProvider } from './features/auth/AuthProvider';
import { KEOAddPage } from './pages/bdo/keo/keo-add-page';
import { KEOPage } from './pages/bdo/keo/keo-page';

function Root() {
  return <Navigate to="/app" />;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// axios.defaults.headers['aaa'] = 'XDD';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <SidebarProvider>
            <NotificationProvider>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Root />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="/app" element={<AppLayout />}>
                    <Route index element={<AppPage />} />
                    <Route path="vehicles">
                      <Route index element={<VehiclesPage />} />
                      <Route path=":id" element={<VehiclePage />} />
                    </Route>
                    <Route path="employees">
                      <Route index element={<EmployeesPage />} />
                      <Route path=":id" element={<EmployeePage />} />
                    </Route>
                    <Route path="bdo">
                      <Route path="kpo">
                        <Route index element={<KPOPage />} />
                        <Route path="add" element={<KPOAddPage />} />
                      </Route>
                      <Route path="keo">
                        <Route index element={<KEOPage />} />
                        <Route path="add" element={<KEOAddPage />} />
                      </Route>
                    </Route>
                    <Route path="projects">
                      <Route index element={<ProjectsPage />} />
                      <Route path=":id" element={<ProjectPage />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </HashRouter>
            </NotificationProvider>
          </SidebarProvider>
        </ErrorBoundary>
        {import.meta.env.MODE !== 'cypress' && <ReactQueryDevtools initialIsOpen />}
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
