import { Meta, StoryObj } from '@storybook/react';
import { Button, sizes, variants } from './Button';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: "Button's variant",
      defaultValue: 'neutral',
      options: Object.keys(variants),
    },
    size: {
      control: 'select',
      description: "Button's size",
      defaultValue: 'sm',
      options: Object.keys(sizes),
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-6">
      {Object.keys(variants).map((variant: any) => (
        <div>
          <p className="text-sm text-gray-400">{variant}</p>
          <Button variant={variant}>Click me</Button>
          <p className="mt-8 text-sm text-gray-400">disabled</p>
          <Button disabled variant={variant}>
            Click me
          </Button>
        </div>
      ))}
    </div>
  ),
};
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      {Object.keys(sizes).map((size: any) => (
        <div>
          <p className="text-sm text-gray-400">{size}</p>
          <Button size={size}>Click me</Button>
        </div>
      ))}
    </div>
  ),
};
