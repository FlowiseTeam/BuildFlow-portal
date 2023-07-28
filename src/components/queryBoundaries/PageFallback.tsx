import { Page } from '@src/layouts/Page';
import { Button } from '../button/Button';

export function PageFallback({ title, message }: { title: string; message: string }) {
  return (
    <Page title={title}>
      <div className="mt-16 text-center">
        <p className="mb-2">{message}</p>
        <Button variant="warning" onClick={() => window.location.reload()}>
          Spróbuj ponownie
        </Button>
      </div>
    </Page>
  );
}
