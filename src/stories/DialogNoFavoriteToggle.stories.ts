import type { Meta, StoryObj } from '@storybook/react';
import { DialogNoFavoriteToggle } from '@/components/single/no/DialogNoFavoriteToggle';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DialogNoFavoriteToggle',
  component: DialogNoFavoriteToggle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'center',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DialogNoFavoriteToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 通常: Story = {
  args: {
    isChecked: false,
  },
};

export const 小さめ: Story = {
  args: {
    isChecked: true,
  },
};
