import { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { SidebarProvider } from '../sidebar/SidebarProvider';

const meta: Meta<typeof Header> = {
  title: 'components/Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const HeaderComponnent: Story = {
  render: () => (
    <SidebarProvider>
      <Header />
    </SidebarProvider>
  ),
};
