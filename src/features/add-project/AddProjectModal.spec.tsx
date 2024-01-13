import { QueryProvider, render } from '@src/lib/tests';
import { AddProjectModal } from './AddProjectModal';
import { noop } from 'lodash';

describe('AddProjectModal', () => {
  it('renders modal when toggled on', async () => {
    const { findByText } = render(
      <QueryProvider>
        <AddProjectModal show={true} onClose={noop} onSuccess={noop} />
      </QueryProvider>,
    );

    const el = await findByText('Dodaj projekt');
    expect(el).toBeVisible();
  });

  it('Add btn is disabled on enter', async () => {
    const { findByText } = render(
      <QueryProvider>
        <AddProjectModal show={true} onClose={noop} onSuccess={noop} />
      </QueryProvider>,
    );

    const el = await findByText('Dodaj');
    expect(el).toBeDisabled();
  });

  it.todo("calls 'handleFormSubmit' with valid props on add", () => {});
});
