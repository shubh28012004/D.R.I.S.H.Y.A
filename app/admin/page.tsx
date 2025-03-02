import type { Metadata } from "next"
import AdminHeader from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminCriminalRecords from "@/components/admin/admin-criminal-records"
import AdminAlertSystem from "@/components/admin/admin-alert-system"
import AdminStats from "@/components/admin/admin-stats"

export const metadata: Metadata = {
  title: "Admin Dashboard | D.R.I.S.H.Y.A",
  description: "Admin control panel for D.R.I.S.H.Y.A system",
}

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>

        <AdminStats />

        <Tabs defaultValue="criminal-records" className="space-y-4">
          <TabsList>
            <TabsTrigger value="criminal-records">Criminal Records</TabsTrigger>
            <TabsTrigger value="alert-system">Alert System</TabsTrigger>
            <TabsTrigger value="system-logs">System Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="criminal-records" className="space-y-4">
            <AdminCriminalRecords />
          </TabsContent>

          <TabsContent value="alert-system" className="space-y-4">
            <AdminAlertSystem />
          </TabsContent>

          <TabsContent value="system-logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>View system activity and error logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="text-sm font-medium">System startup</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      System initialized successfully - 2023-04-01 08:00:00
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="text-sm font-medium">Model update</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Detection model updated to version 2.3.0 - 2023-04-01 09:15:00
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="text-sm font-medium">Error</div>
                    <div className="text-xs text-destructive mt-1">
                      Connection to camera #3 lost - 2023-04-01 10:30:00
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="text-sm font-medium">Alert triggered</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Violence detection alert triggered - 2023-04-01 11:45:00
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="text-sm font-medium">User login</div>
                    <div className="text-xs text-muted-foreground mt-1">Admin user logged in - 2023-04-01 12:00:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

