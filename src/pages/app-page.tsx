import { Page } from '@layouts/Page';
import { getCompany } from '@services/api';
import { getWelcomingText } from '@utils/utils';
import { useQuery } from 'react-query';

export function AppPage() {
  const { data } = useQuery('company', getCompany, { suspense: true });
  return (
    <Page title={data.name}>
      <Dashboard />
    </Page>
  );
}

export function Dashboard() {
  const welcomeText = getWelcomingText();
  return (
    <div className="grid grid-cols-4 grid-rows-5  gap-4">
      <p className=" col-start-1 col-end-5 row-start-1 row-end-2">{welcomeText}</p>
    </div>
  );
}
