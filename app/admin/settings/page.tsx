import type { Metadata } from "next"
import AdminHeader from "@/components/admin/admin-header"
import SystemSettings from "@/components/admin/system-settings"

export const metadata: Metadata = {
  title: "System Settings | D.R.I.S.H.Y.A Admin",
  description: "Configure system-wide parameters and settings",
}

export default function SystemSettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        </div>
        <SystemSettings />
      </div>
    </div>
  )
}

