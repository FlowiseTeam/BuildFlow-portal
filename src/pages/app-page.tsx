import { Page } from '@layouts/Page';
import { Dashboard } from '@src/features/dashboard/Dashboard';
import { DashboardHeader } from '@src/features/dashboard/DashboardHeader';

export function AppPage() {
  const data = { name: 'Bud-pol' };
  return (
    <Page header={<DashboardHeader companyName={data.name} />}>
      <Dashboard />
    </Page>
  );
}
