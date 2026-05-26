import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AccordionSection } from './accordion'

const meta = {
  title: 'Primitives/Accordion',
  component: AccordionSection,
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'open-section',
    title: 'Getting Started',
    isOpen: true,
    onToggle: () => {},
    children: (
      <p style={{ fontSize: '14px', color: '#666' }}>
        This is the accordion content. It is visible when the accordion is open. You can put any content here including
        forms, lists, or other components.
      </p>
    ),
  },
}

export const Closed: Story = {
  args: {
    id: 'closed-section',
    title: 'Advanced Configuration',
    isOpen: false,
    onToggle: () => {},
    children: (
      <p style={{ fontSize: '14px', color: '#666' }}>
        This content is hidden when the accordion is closed.
      </p>
    ),
  },
}

export const WithAction: Story = {
  args: {
    id: 'action-section',
    title: 'Notifications',
    isOpen: true,
    onToggle: () => {},
    action: (
      <span
        style={{
          fontSize: '12px',
          padding: '2px 8px',
          borderRadius: '9999px',
          backgroundColor: '#e0f2fe',
          color: '#0284c7',
          fontWeight: 500,
        }}
      >
        3 new
      </span>
    ),
    children: (
      <p style={{ fontSize: '14px', color: '#666' }}>
        You have 3 unread notifications. Review them below.
      </p>
    ),
  },
}

export const WithIcon: Story = {
  args: {
    id: 'icon-section',
    title: 'Security Settings',
    isOpen: true,
    onToggle: () => {},
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    children: (
      <p style={{ fontSize: '14px', color: '#666' }}>
        Configure your security settings including two-factor authentication and login alerts.
      </p>
    ),
  },
}

export const Interactive: Story = {
  render: () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
      section1: true,
      section2: false,
      section3: false,
    })

    const toggle = (id: string) => {
      setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '600px' }}>
        <AccordionSection
          id="section1"
          title="What is this design system?"
          isOpen={openSections.section1}
          onToggle={() => toggle('section1')}
        >
          <p style={{ fontSize: '14px', color: '#666' }}>
            A comprehensive collection of reusable UI components built with React and Tailwind CSS, designed for
            consistency and accessibility.
          </p>
        </AccordionSection>
        <AccordionSection
          id="section2"
          title="How do I install it?"
          isOpen={openSections.section2}
          onToggle={() => toggle('section2')}
        >
          <p style={{ fontSize: '14px', color: '#666' }}>
            Install the package using npm or yarn, then import the components you need.
          </p>
        </AccordionSection>
        <AccordionSection
          id="section3"
          title="Can I customize the theme?"
          isOpen={openSections.section3}
          onToggle={() => toggle('section3')}
        >
          <p style={{ fontSize: '14px', color: '#666' }}>
            Yes, the design system supports theming via CSS variables and Tailwind configuration.
          </p>
        </AccordionSection>
      </div>
    )
  },
}

export const WithRichContent: Story = {
  args: {
    id: 'rich-section',
    title: 'Team Members',
    isOpen: true,
    onToggle: () => {},
    action: (
      <span style={{ fontSize: '12px', color: '#666' }}>5 members</span>
    ),
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson'].map((name) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {name[0]}
            </div>
            <span style={{ fontSize: '14px' }}>{name}</span>
          </div>
        ))}
      </div>
    ),
  },
}
