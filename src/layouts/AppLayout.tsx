import { Header } from '@components/header/Header';
import { QueryBoundaries } from '@components/queryBoundaries/QueryBoundaries';
import { Sidebar } from '@components/sidebar/Sidebar';
import { ProtectedRoute } from '@src/pages/ProtectedRoute';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-grow">
          <Sidebar />
          <QueryBoundaries>
            <Outlet />
          </QueryBoundaries>
        </main>
      </div>
    </ProtectedRoute>
  );
}
