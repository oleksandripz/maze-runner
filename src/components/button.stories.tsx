import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn()
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: 'Почати гру',
  },
};

export const SecondaryText: Story = {
  args: {
    text: 'Наступний тур',
  },
};

export const LongText: Story = {
  args: {
    text: 'Спробувати пройти лабіринт ще раз',
  },
};