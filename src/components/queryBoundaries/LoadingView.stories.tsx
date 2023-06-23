import { Meta } from '@storybook/react';
import { LoadingView } from './LoadingView';

const meta: Meta<typeof LoadingView> = {
  title: 'components/LoadingView',
  component: LoadingView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'LoadingView component is rendered when suspense is thrown. It is used in QueryBoundaries component which wrap application routes.',
      },
    },
  },
};

export default meta;

export const LoadingState = {
  render: () => <LoadingView />,
};
