import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { DialogConfirm } from '@/components/domains/single/DialogConfirm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DialogConfirm',
  component: DialogConfirm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DialogConfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 通常: Story = {
  args: {
    isVisible: true,
    question:
      'テスト質問があります。テスト質問があります。テスト質問があります。',
    answers: ['回答1', '回答2'],
    onClose: (num) => {
      action(`onClose => ${num}`)();
    },
  },
};

export const 改行を含む: Story = {
  args: {
    isVisible: true,
    question: [
      'テスト質問があります。テスト質問があります。テスト質問があります。',
      'a：1',
      'b：2',
    ],
    answers: ['a', 'b'],
    onClose: () => {},
  },
};
