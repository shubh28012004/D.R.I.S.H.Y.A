import type { Metadata } from "next"
import AdminHeader from "@/components/admin/admin-header"
import UserManagement from "@/components/admin/user-management"

export const metadata: Metadata = {
  title: "User Management | D.R.I.S.H.Y.A Admin",
  description: "Manage users and their permissions",
}

export default function UserManagementPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        </div>
        <UserManagement />
      </div>
    </div>
  )
}

