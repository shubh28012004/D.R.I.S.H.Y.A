import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Filter, Download, RefreshCw } from "lucide-react"

const staticDetections = [
  {
    id: "det_001",
    type: "Zebra Crossing",
    confidence: 0.95,
    timestamp: "2023-04-01T10:30:00Z",
    location: "Main Street & 5th Avenue",
  },
  {
    id: "det_002",
    type: "Garbage Bin",
    confidence: 0.88,
    timestamp: "2023-04-01T11:15:00Z",
    location: "Central Park",
  },
  {
    id: "det_003",
    type: "Traffic Signal",
    confidence: 0.92,
    timestamp: "2023-04-01T12:00:00Z",
    location: "Broadway & 42nd Street",
  },
  {
    id: "det_004",
    type: "Violence Detection",
    confidence: 0.75,
    timestamp: "2023-04-01T13:45:00Z",
    location: "Downtown Plaza",
  },
  {
    id: "det_005",
    type: "Pedestrian",
    confidence: 0.89,
    timestamp: "2023-04-01T14:30:00Z",
    location: "Subway Station Entrance",
  },
]

export const metadata: Metadata = {
  title: "Detections | D.R.I.S.H.Y.A",
  description: "View and manage detected objects",
}

export default function DetectionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Detections</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Detection History</CardTitle>
              <CardDescription>Browse and filter all detected objects</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <div className="flex justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="zebra">Zebra Crossings</TabsTrigger>
                    <TabsTrigger value="garbage">Garbage Bins</TabsTrigger>
                    <TabsTrigger value="traffic">Traffic Elements</TabsTrigger>
                    <TabsTrigger value="violence">Violence Alerts</TabsTrigger>
                  </TabsList>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Search detections..." className="h-8" />
                  </div>
                </div>

                <TabsContent value="all" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staticDetections.map((detection) => (
                      <DetectionCard key={detection.id} detection={detection} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="zebra" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staticDetections
                      .filter((d) => d.type === "Zebra Crossing")
                      .map((detection) => (
                        <DetectionCard key={detection.id} detection={detection} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="garbage" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staticDetections
                      .filter((d) => d.type === "Garbage Bin")
                      .map((detection) => (
                        <DetectionCard key={detection.id} detection={detection} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staticDetections
                      .filter((d) => d.type === "Traffic Signal")
                      .map((detection) => (
                        <DetectionCard key={detection.id} detection={detection} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="violence" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staticDetections
                      .filter((d) => d.type === "Violence Detection")
                      .map((detection) => (
                        <DetectionCard key={detection.id} detection={detection} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DetectionCard({ detection }: { detection: (typeof staticDetections)[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={`/placeholder.svg?height=200&width=300&text=${detection.type.replace(" ", "+")}`}
          alt={detection.type}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
          {(detection.confidence * 100).toFixed(0)}% confidence
        </div>
        {detection.type === "Violence Detection" && (
          <div className="absolute top-2 left-2 bg-destructive px-2 py-1 rounded text-xs text-destructive-foreground">
            Alert
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{detection.type}</h3>
            <p className="text-sm text-muted-foreground">{new Date(detection.timestamp).toLocaleString()}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            View
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">ID: {detection.id}</div>
        <div className="text-xs text-muted-foreground mt-1">Location: {detection.location}</div>
      </CardContent>
    </Card>
  )
}

