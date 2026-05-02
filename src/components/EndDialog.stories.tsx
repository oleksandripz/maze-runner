import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EndDialog from './EndDialog';

const meta: Meta<typeof EndDialog> = {
  title: 'Components/EndDialog',
  component: EndDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onNextLevel: fn(),
    onRestart: fn(),
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof EndDialog>;

export const QuickWin: Story = {
  args: {
    moves: 14,
    time: 45,
  },
};

export const LongGame: Story = {
  args: {
    moves: 156,
    time: 315,
  },
};