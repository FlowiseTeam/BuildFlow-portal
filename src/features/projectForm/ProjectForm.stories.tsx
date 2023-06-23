import { Meta, StoryObj } from '@storybook/react';
import { ProjectForm } from './ProjectForm';

const meta: Meta<typeof ProjectForm> = {
  title: 'forms/ProjectForm',
  component: ProjectForm,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ProjectForm>;

export const EmptyForm: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: {
    project: {
      city: 'Poznań',
      client: 'Miasto Poznań',
      created_at: '2023-06-21T17:42:54.789Z',
      employees: [],
      end_date: '2033-10-10T00:00:00.000Z',
      name: 'Projekt Centrum',
      start_date: '2001-10-10T00:00:00.000Z',
      status: 'W trakcie',
      street: 'Święty Marcin',
      updated_at: '2023-06-21T19:28:14.204Z',
      zipcode: '60-700',
      _id: 1,
    },
  },
};
