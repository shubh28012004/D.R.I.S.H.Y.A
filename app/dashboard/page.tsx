import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DetectionFeed from "@/components/dashboard/detection-feed"
import DetectionStats from "@/components/dashboard/detection-stats"
import RecentDetections from "@/components/dashboard/recent-detections"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Dashboard | D.R.I.S.H.Y.A",
  description: "Monitor and analyze real-time detection data",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <DetectionStats />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <DetectionFeed className="col-span-4" />
              <RecentDetections className="col-span-3" />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-2">
                <h3 className="text-lg font-medium">Detection Analytics</h3>
                <p className="text-sm text-muted-foreground">Detailed analytics will be displayed here.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-2">
                <h3 className="text-lg font-medium">Recent Alerts</h3>
                <p className="text-sm text-muted-foreground">Recent alerts will be displayed here.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

