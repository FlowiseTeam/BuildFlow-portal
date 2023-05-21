import { AppLayout } from '@layouts/AppLayout';
import { AppPage } from '@pages/app-page';
import { BDOPage } from '@pages/bdo-page';
import { EmployeesPage } from '@pages/employees-page';
import { ErrorPage } from '@pages/error-page';
import { ProjectPage } from '@pages/project-page';
import { ProjectsPage } from '@pages/projects-page';
import { VehiclesPage } from '@pages/vehicles-page';
import { Routes, Route, Outlet } from 'react-router-dom';

function Root() {
  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<AppPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="bdo" element={<BDOPage />} />
        <Route path="projects">
          <Route index element={<ProjectsPage />} />
          <Route path=":id" element={<ProjectPage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
