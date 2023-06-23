import { Meta, StoryObj } from '@storybook/react';
import { EmployeeForm } from './EmployeeForm';

const meta: Meta<typeof EmployeeForm> = {
  title: 'forms/EmployeeForm',
  component: EmployeeForm,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof EmployeeForm>;

export const EmptyForm: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: {
    employee: {
      _id: 1,
      first_name: 'Jan',
      last_name: 'Kowalski',
      assigned_project: [],
      created_at: '2023-06-21T17:42:54.789Z',
      updated_at: '2023-06-21T19:28:14.204Z',
      role: 'Malarz',
      status: 'Urlop',
      qualifications: [],
    },
  },
};
