import type React from "react"
import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, Trash2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Notifications | D.R.I.S.H.Y.A",
  description: "View and manage your notifications",
}

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge className="ml-2 bg-primary/20 text-primary" variant="outline">
                12
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts
              <Badge className="ml-2 bg-destructive/20 text-destructive" variant="outline">
                3
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="system">
              System
              <Badge className="ml-2 bg-muted-foreground/20 text-muted-foreground" variant="outline">
                5
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="detections">
              Detections
              <Badge className="ml-2 bg-blue-500/20 text-blue-500" variant="outline">
                4
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>View all your recent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
                    title="Violence detected at Downtown Plaza"
                    description="A potential violent incident was detected with 87% confidence."
                    time="2 minutes ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<Bell className="h-5 w-5 text-blue-500" />}
                    title="New detection alert"
                    description="Multiple garbage bins detected at Central Park."
                    time="15 minutes ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<Info className="h-5 w-5 text-muted-foreground" />}
                    title="System update completed"
                    description="The detection model has been updated to version 2.3.0."
                    time="1 hour ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                    title="Detection feed refreshed"
                    description="The detection feed has been refreshed successfully."
                    time="2 hours ago"
                  />
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
                    title="Criminal record match found"
                    description="A potential match with criminal record CR-2023-0001 was detected."
                    time="3 hours ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<Bell className="h-5 w-5 text-blue-500" />}
                    title="New zebra crossing detected"
                    description="A new zebra crossing was detected at Junction Road."
                    time="5 hours ago"
                  />
                  <NotificationItem
                    icon={<Info className="h-5 w-5 text-muted-foreground" />}
                    title="Login from new device"
                    description="Your account was accessed from a new device."
                    time="1 day ago"
                  />
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    title="Detection confidence low"
                    description="Some detections have low confidence scores. Please review."
                    time="2 days ago"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Alert Notifications</CardTitle>
                <CardDescription>Critical alerts that require attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
                    title="Violence detected at Downtown Plaza"
                    description="A potential violent incident was detected with 87% confidence."
                    time="2 minutes ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
                    title="Criminal record match found"
                    description="A potential match with criminal record CR-2023-0001 was detected."
                    time="3 hours ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    title="Detection confidence low"
                    description="Some detections have low confidence scores. Please review."
                    time="2 days ago"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
                <CardDescription>Updates about the system and your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <NotificationItem
                    icon={<Info className="h-5 w-5 text-muted-foreground" />}
                    title="System update completed"
                    description="The detection model has been updated to version 2.3.0."
                    time="1 hour ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                    title="Detection feed refreshed"
                    description="The detection feed has been refreshed successfully."
                    time="2 hours ago"
                  />
                  <NotificationItem
                    icon={<Info className="h-5 w-5 text-muted-foreground" />}
                    title="Login from new device"
                    description="Your account was accessed from a new device."
                    time="1 day ago"
                  />
                  <NotificationItem
                    icon={<Info className="h-5 w-5 text-muted-foreground" />}
                    title="Profile updated"
                    description="Your profile information has been updated successfully."
                    time="3 days ago"
                  />
                  <NotificationItem
                    icon={<Info className="h-5 w-5 text-muted-foreground" />}
                    title="Password changed"
                    description="Your account password was changed successfully."
                    time="1 week ago"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detections">
            <Card>
              <CardHeader>
                <CardTitle>Detection Notifications</CardTitle>
                <CardDescription>Updates about object detections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <NotificationItem
                    icon={<Bell className="h-5 w-5 text-blue-500" />}
                    title="New detection alert"
                    description="Multiple garbage bins detected at Central Park."
                    time="15 minutes ago"
                    isUnread
                  />
                  <NotificationItem
                    icon={<Bell className="h-5 w-5 text-blue-500" />}
                    title="New zebra crossing detected"
                    description="A new zebra crossing was detected at Junction Road."
                    time="5 hours ago"
                  />
                  <NotificationItem
                    icon={<Bell className="h-5 w-5 text-blue-500" />}
                    title="Traffic signal detection"
                    description="A new traffic signal was detected at Main Street."
                    time="1 day ago"
                  />
                  <NotificationItem
                    icon={<Bell className="h-5 w-5 text-blue-500" />}
                    title="Pedestrian detection"
                    description="Multiple pedestrians detected at School Zone."
                    time="2 days ago"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function NotificationItem({
  icon,
  title,
  description,
  time,
  isUnread = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  time: string
  isUnread?: boolean
}) {
  return (
    <div className={`flex items-start space-x-4 rounded-md border p-4 ${isUnread ? "bg-muted/50" : ""}`}>
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <p className={`text-sm font-medium ${isUnread ? "font-semibold" : ""}`}>{title}</p>
          {isUnread && (
            <Badge className="ml-2 bg-primary/20 text-primary text-xs" variant="outline">
              New
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center pt-1 text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {time}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete notification</span>
      </Button>
    </div>
  )
}

