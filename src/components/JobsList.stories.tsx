import type { Meta, StoryObj } from '@storybook/react-vite'
import JobsList from './JobsList'
import './MapWithJobs.css'

const meta = {
  title: 'Components/JobsList',
  component: JobsList,
  args: {
    onJobDone: () => undefined,
  },
  decorators: [
    (Story) => (
      <aside className="job-list">
        <Story />
      </aside>
    ),
  ],
} satisfies Meta<typeof JobsList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    jobs: [
      {
        id: 1,
        points: [
          [52.32, 20.78],
          [52.38, 21.18],
          [52.12, 21.12],
        ],
        description: 'Plant new trees',
        status: 'todo',
      },
      {
        id: 2,
        points: [
          [50.34, 19.62],
          [50.42, 20.14],
          [50.08, 20.08],
        ],
        description: 'Clear walking paths',
        status: 'done',
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    jobs: [],
  },
}
