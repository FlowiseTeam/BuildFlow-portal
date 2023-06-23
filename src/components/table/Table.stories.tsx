import { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { columns } from '@src/features/projectsTable/ProjectsTable';
import { columns as employeesColumns } from '@src/features/employees/EmployeesTable';

const meta: Meta<typeof Table> = {
  title: 'components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Columns to display in the table',
    },
    data: {
      description: 'Data to display in the table',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const projectData = [
  {
    address: 'Poznań, Święty Marcin',
    city: 'Poznań',
    client: 'Miasto Poznań',
    created_at: '2023-06-21T17:42:54.789Z',
    employees: 3,
    end_date: '2033-10-10T00:00:00.000Z',
    id: 1,
    name: 'Projekt Centrum',
    start_date: '2001-10-10T00:00:00.000Z',
    status: 'W trakcie',
    street: 'Święty Marcin',
    updated_at: '2023-06-21T19:28:14.204Z',
    zipcode: '60-700',
    _id: 1,
  },
  {
    address: 'Gorzów Wielkopolski, Sikorskiego 5',
    city: 'Gorzów Wielkopolski',
    client: 'Erwin',
    created_at: '2023-06-21T17:44:08.703Z',
    employees: 4,
    end_date: '2023-06-30T00:00:00.000Z',
    id: 2,
    name: 'Remont M3',
    start_date: '2023-06-22T00:00:00.000Z',
    status: 'Zawieszony',
    street: 'Sikorskiego 5',
    updated_at: '2023-06-21T17:56:52.956Z',
    zipcode: '66-400',
    _id: 2,
  },
  {
    address: 'Poznań, Kolejowa',
    city: 'Poznań',
    client: 'Miasto Poznań',
    created_at: '2023-06-21T18:58:22.769Z',
    employees: 2,
    end_date: '2025-10-10T00:00:00.000Z',
    id: 3,
    name: 'Kolejowa',
    start_date: '2023-01-10T00:00:00.000Z',
    status: 'Zakończony',
    street: 'Kolejowa',
    updated_at: '2023-06-21T18:58:22.769Z',
    zipcode: '60-668',
    _id: 3,
  },
];

const employeesData = [
  {
    assigned_project: ['Kolejowa', 'Rynek', 'Remont M3', 'Projekt Centrum'],
    created_at: '2023-06-21T17:46:41.570Z',
    first_name: 'Jan',
    id: 1,
    last_name: 'Kowalski',
    qualifications: ['Prawo jazdy B', 'Uprawnienia wysokosciowe'],
    role: 'elektryk',
    status: 'Urlop',
    updated_at: '2023-06-21T19:26:21.904Z',
    _id: 1,
  },
  {
    assigned_project: ['Kolejowa', 'Rynek', 'Remont M3', 'Projekt Centrum'],
    created_at: '2023-06-21T17:46:41.570Z',
    first_name: 'Jan',
    id: 2,
    last_name: 'Kowalski',
    qualifications: ['Prawo jazdy B', 'Uprawnienia wysokosciowe'],
    role: 'elektryk',
    status: 'Urlop',
    updated_at: '2023-06-21T19:26:21.904Z',
    _id: 2,
  },
  {
    assigned_project: [
      'Kolejowa',
      'Rynek',
      'Remont M3',
      'Projekt Centrum',
      'Galeria Malta',
      'Wrocław',
      'Gdansk',
      'Hala Stulecia',
      'Amfiteatr Ostrowski',
    ],
    created_at: '2023-06-21T17:46:41.570Z',
    first_name: 'Jan',
    id: 3,
    last_name: 'Kowalski',
    qualifications: ['Prawo jazdy B', 'Uprawnienia wysokosciowe'],
    role: 'elektryk',
    status: 'Urlop',
    updated_at: '2023-06-21T19:26:21.904Z',
    _id: 3,
  },
  {
    assigned_project: ['Kolejowa'],
    created_at: '2023-06-21T17:46:41.570Z',
    first_name: 'Adam',
    id: 4,
    last_name: 'Kowalski',
    qualifications: ['Prawo jazdy B', 'Uprawnienia wysokosciowe'],
    role: 'elektryk',
    status: 'Urlop',
    updated_at: '2023-06-21T19:26:21.904Z',
    _id: 4,
  },
  {
    assigned_project: [],
    created_at: '2023-06-21T17:46:41.570Z',
    first_name: 'Jan',
    id: 5,
    last_name: 'Gromada',
    qualifications: ['Prawo jazdy B', 'Uprawnienia wysokosciowe'],
    role: 'elektryk',
    status: 'Nieprzypisany',
    updated_at: '2023-06-21T19:26:21.904Z',
    _id: 5,
  },
  {
    assigned_project: ['Kolejowa', 'Rynek', 'Remont M3', 'Projekt Centrum'],
    created_at: '2023-06-21T17:46:41.570Z',
    first_name: 'Jan',
    id: 6,
    last_name: 'Zagonczyk',
    qualifications: ['Prawo jazdy B', 'Uprawnienia wysokosciowe'],
    role: 'murarz, malarz',
    status: 'Przypisany',
    updated_at: '2023-06-21T19:26:21.904Z',
    _id: 6,
  },
];

export const ProjectsTable: Story = {
  render: () => <Table columns={columns} data={projectData} onRowClick={() => {}} />,
};

export const EmployeesTable: Story = {
  render: () => <Table columns={employeesColumns} data={employeesData} onRowClick={() => {}} />,
};

export const VehiclesTable: Story = {
  render: () => (
    <Table
      columns={[
        { type: 'select', title: 'Pojazd', key: 'vehicle', sortable: true },
        { type: 'select', title: 'Numer rejestracyjny', key: 'plate', sortable: false },
        { type: 'select', title: 'Data przeglądu', key: 'date', sortable: false },
      ]}
      data={[{ id: 1, vehicle: '213123', plate: '21313', date: '10.23.24' }]}
      onRowClick={() => {}}
    />
  ),
};
