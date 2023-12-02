import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Input } from '@src/components/Input/Input';
import { Button } from '@src/components/button/Button';
import { Header } from '@src/components/header/Header';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { useAuth } from '@src/features/auth/AuthProvider';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const { authenticated, login } = useAuth();

  if (authenticated) {
    return <Navigate to=".." relative="path" />;
  }

  return (
    <div>
      <Header noSidebar />
      <div className="flex h-full w-full justify-center">
        <div className="fixed flex h-full items-center">
          <div className="mb-36">
            <p>Nie jesteś zalogowany.</p>
            <Button onClick={() => login()} className="break flex w-full items-center justify-between">
              Zaloguj się <ArrowTopRightOnSquareIcon className="h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function () {
  return (
    <ErrorBoundary fallback={<PageFallback title="Błąd" message="Wystąpił błąd. Odśwież stronę." />}>
      <LoginPage />
    </ErrorBoundary>
  );
}
