import { Meta, StoryObj } from '@storybook/react';
import { ListboxInput } from './ListboxInput';

const meta: Meta<typeof ListboxInput> = {
  title: 'components/ListboxInput',
  component: ListboxInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const values = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

export const Example: Story = {
  args: {
    values: values,
    labelText: 'Label text',
    defaultValue: 'one',
  },
};

export const Disabled: Story = {
  args: {
    values: values,
    labelText: 'Label text',
    defaultValue: 'one',
    disabled: true,
  },
};
