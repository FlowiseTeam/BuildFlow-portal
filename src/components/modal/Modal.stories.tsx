import { Meta, StoryFn } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Modal } from './Modal';

const meta = {
  title: 'components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

const Template: StoryFn<typeof Modal> = (args) => {
  const [{ show }, updateArgs] = useArgs();
  const toggleModal = () => updateArgs({ show: !show });

  return (
    <>
      <button
        className="rounded-full p-1 bg-primary-light text-white flex justify-end items-center"
        onClick={toggleModal}
      >
        Open modal
      </button>
      <Modal {...args} show={show} onClose={toggleModal}>
        {args.children}
        <div>
          <button onClick={toggleModal}>close</button>
        </div>
      </Modal>
    </>
  );
};

Template.parameters = {
  docs: {
    inlineStories: false,
    iframeHeight: 500,
  },
};
export const Opened = Template.bind({});

Opened.args = {
  children: <div>Example div</div>,
  show: true,
  title: 'Example opened modal',
};
