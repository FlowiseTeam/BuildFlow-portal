import { Header } from '@components/header/Header';
import { QueryBoundaries } from '@components/queryBoundaries/QueryBoundaries';
import { Sidebar } from '@components/sidebar/Sidebar';
import { SidebarProvider } from '@components/sidebar/SidebarProvider';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-grow">
          <Sidebar />
          <QueryBoundaries>
            <Outlet />
          </QueryBoundaries>
        </main>
      </div>
    </SidebarProvider>
  );
}
