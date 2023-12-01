import { useAuth } from '@src/features/auth/AuthProvider';
import { Button } from '../button/Button';

function SectionItem({ children }: { children: React.ReactNode }) {
  return <li className="rounded hover:bg-gray-100">{children}</li>;
}

export function UserSection() {
  const { authenticated, login, logout } = useAuth();

  return (
    <nav className="w-36 rounded-md border-[1px] bg-white p-1 shadow-sm">
      <ul className="w-full text-center">
        {!authenticated && (
          <SectionItem>
            <Button className="w-full rounded-sm" variant="none" onClick={() => login()}>
              Zaloguj się
            </Button>
          </SectionItem>
        )}
        {authenticated && (
          <SectionItem>
            <Button className="w-full rounded-sm" variant="none" onClick={() => logout()}>
              Wyloguj się
            </Button>
          </SectionItem>
        )}
      </ul>
    </nav>
  );
}
