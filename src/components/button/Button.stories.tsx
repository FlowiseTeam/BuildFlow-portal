import { Meta, StoryFn } from '@storybook/react';
import { Button, sizes, variants } from './Button';

type ButtonStoryProps = {
  variant: keyof typeof variants;
  size: keyof typeof sizes;
};

const meta = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.keys(variants),
      },
    },
    size: {
      control: {
        type: 'select',
        options: Object.keys(sizes),
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

const Template: StoryFn<ButtonStoryProps> = ({ variant, size }) => (
  <Button variant={variant} size={size}>
    Click me
  </Button>
);

Template.args = {
  variant: 'neutral',
  size: 'sm',
};

export const Default = Template.bind({});

Default.args = {
  variant: 'neutral',
  size: 'sm',
};

export const Primary = Template.bind({});

Primary.args = {
  variant: 'primary',
};
