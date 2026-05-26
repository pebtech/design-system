import type { Meta, StoryObj } from '@storybook/react'
import { Stat, Stat2, Stat4 } from './stat'

const meta = {
  title: 'Data Display/Stat',
  component: Stat,
  tags: ['autodocs'],
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    except: 'from last month',
    badgeColor: 'green',
  },
}

export const SimpleStat: Story = {
  render: () => (
    <Stat2 title="Active Users" value="2,350" />
  ),
}

export const WithChangePctAndDirection: Story = {
  render: () => (
    <Stat4
      title="Monthly Sales"
      value="$12,450"
      changePct={8.2}
      changeDirection="up"
      changeLabel="compared to last month"
    />
  ),
}

export const StatGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1%"
        except="from last month"
        badgeColor="green"
      />
      <Stat
        title="Subscriptions"
        value="+2,350"
        change="+180.1%"
        except="from last month"
        badgeColor="green"
      />
      <Stat
        title="Sales"
        value="+12,234"
        change="+19%"
        except="from last month"
        badgeColor="lime"
      />
      <Stat4
        title="Refunds"
        value="$1,023"
        changePct={4.5}
        changeDirection="down"
        changeLabel="from last month"
      />
    </div>
  ),
}
