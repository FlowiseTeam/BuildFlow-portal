import { getWelcomingText } from '@src/utils/utils';

export function DashboardHeader({ companyName }: { companyName: string }) {
  const welcomeText = getWelcomingText();

  return (
    <header className="mb-6 font-abhaya">
      <h3 className="mb-4 text-center text-4xl font-semibold text-primary sm:text-left">{companyName}</h3>
      <p className="text-center text-gray-500 sm:text-left">{welcomeText}</p>
    </header>
  );
}
