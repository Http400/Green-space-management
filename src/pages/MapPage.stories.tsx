import type { Meta, StoryObj } from '@storybook/react-vite'
import MapPage from './MapPage'

const meta = {
  title: 'Pages/MapPage',
  component: MapPage,
} satisfies Meta<typeof MapPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
