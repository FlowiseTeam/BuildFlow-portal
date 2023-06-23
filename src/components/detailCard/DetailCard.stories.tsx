import { Meta, StoryObj } from '@storybook/react';
import { DetailCard } from './DetailCard';
import { FallbackMap } from '../fallbackMap/FallbackMap';

const meta: Meta<typeof DetailCard> = {
  title: 'components/DetailCard',
  component: DetailCard,
  tags: ['autodocs'],
  argTypes: {
    border: { control: 'text', description: 'Border', defaultValue: 'border-[1px]' },
    className: { control: 'text', description: 'Additional class name', defaultValue: '' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DetailCard>
      <div style={{ height: '200px', backgroundColor: 'pink' }}>children goes here...</div>
    </DetailCard>
  ),
};

export const ExampleGrid: Story = {
  render: () => (
    <div className="grid auto-rows-fr grid-cols-3 gap-4">
      <DetailCard className="col-span-2">
        <FallbackMap />
      </DetailCard>
      <DetailCard className="row-span-2 p-4">children with p-4</DetailCard>
      <DetailCard>children</DetailCard>
      <DetailCard>children</DetailCard>
    </div>
  ),
};
