import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { IconButton } from '@/components/ui/IconButton'
import { ThemeSelector } from './ThemeSelector'
import { PinLockSection } from './PinLockSection'
import { DataManagementSection } from './DataManagementSection'
import { AboutSection } from './AboutSection'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-4 mb-4">
      <p className="text-xs font-semibold text-text-subtle uppercase tracking-wider px-1 mb-3">{title}</p>
      <div className="bg-surface-2 rounded-3xl p-4 space-y-4">{children}</div>
    </div>
  )
}

export function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title="Settings"
        left={
          <IconButton label="Back" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />

      <div className="pt-2 pb-8">
        <Section title="Appearance">
          <ThemeSelector />
        </Section>

        <Section title="Security">
          <PinLockSection />
        </Section>

        <Section title="Data">
          <DataManagementSection />
        </Section>

        <Section title="About">
          <AboutSection />
        </Section>
      </div>
    </div>
  )
}
