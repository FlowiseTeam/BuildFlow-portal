import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Name of the input' },
    labelText: { control: 'text', description: 'Label text', defaultValue: '' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    defaultValue: { control: 'text', description: 'Default value', defaultValue: '', type: 'string' },
    disabled: { control: 'boolean', description: 'Disabled', defaultValue: false, type: 'boolean' },
    error: { control: 'object', description: 'Error object. It should have `type` property' },
    validationSchema: {
      control: 'object',
      description: 'Validation schema from react-form-hook',
    },
    className: { control: 'text', description: 'Additional class name. It is set on wrapper div', defaultValue: '' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    name: 'first_name',
    labelText: 'Label text',
    defaultValue: 'some text',
  },
};

export const DisabledInput: Story = {
  args: {
    name: 'first_name',
    labelText: 'Label text',
    defaultValue: 'some text',
    disabled: true,
  },
};

export const InputErrors: Story = {
  render: () => (
    <div>
      <Input
        labelText="label text"
        name=""
        validationSchema={{ minLength: 3 }}
        defaultValue="ab"
        error={{ type: 'minLength' }}
      />
      <Input
        labelText="label text"
        name=""
        validationSchema={{ maxLength: 3 }}
        defaultValue="abcdefgh"
        error={{ type: 'maxLength' }}
      />
      <Input labelText="label text" placeholder="Podaj wartosc" name="name" error={{ type: 'required' }} />
      <Input
        labelText="label text"
        name=""
        defaultValue="100-10"
        validationSchema={{ pattern: /^[0-9]{2}-[0-9]{3}$/i }}
        error={{ type: 'pattern' }}
      />
    </div>
  ),
};
