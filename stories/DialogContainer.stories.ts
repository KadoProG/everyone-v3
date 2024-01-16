import type { Meta, StoryObj } from '@storybook/react';
import DialogContainer from '../components/commons/DialogContainer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DialogContainer',
  component: DialogContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DialogContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 通常: Story = {
  args: {
    isVisible: true,
    children:
      'こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは',
  },
};

export const 小さめ: Story = {
  args: {
    isVisible: true,
    children: 'こんにちはこんにちはこんにちはこんにちはこんにちは',
  },
};
