"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Clock, Download, Eye, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Detection {
  id: string
  type: string
  confidence: number
  timestamp: string
  image: string
  location: string
  isAlert: boolean
}

// Mock data for recent detections
const mockDetections: Detection[] = [
  {
    id: "det_1",
    type: "Zebra Crossing",
    confidence: 0.92,
    timestamp: "2 minutes ago",
    image: "/placeholder.svg?height=200&width=300&text=Zebra+Crossing",
    location: "Main Street",
    isAlert: false,
  },
  {
    id: "det_2",
    type: "Garbage Bin",
    confidence: 0.88,
    timestamp: "5 minutes ago",
    image: "/placeholder.svg?height=200&width=300&text=Garbage+Bin",
    location: "Park Avenue",
    isAlert: false,
  },
  {
    id: "det_3",
    type: "Traffic Signal",
    confidence: 0.95,
    timestamp: "10 minutes ago",
    image: "/placeholder.svg?height=200&width=300&text=Traffic+Signal",
    location: "Junction Road",
    isAlert: false,
  },
  {
    id: "det_4",
    type: "Violence Detection",
    confidence: 0.87,
    timestamp: "15 minutes ago",
    image: "/placeholder.svg?height=200&width=300&text=Violence+Detection",
    location: "Market Square",
    isAlert: true,
  },
  {
    id: "det_5",
    type: "Pedestrian",
    confidence: 0.91,
    timestamp: "20 minutes ago",
    image: "/placeholder.svg?height=200&width=300&text=Pedestrian",
    location: "School Zone",
    isAlert: false,
  },
]

interface RecentDetectionsProps {
  className?: string
}

export default function RecentDetections({ className }: RecentDetectionsProps) {
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const viewDetection = (detection: Detection) => {
    setSelectedDetection(detection)
    setDialogOpen(true)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Detections</CardTitle>
            <CardDescription>Latest objects detected by the system</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="alerts" className="gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              Alerts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="space-y-4">
              {mockDetections.map((detection) => (
                <DetectionItem key={detection.id} detection={detection} onView={viewDetection} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="alerts">
            <div className="space-y-4">
              {mockDetections
                .filter((detection) => detection.isAlert)
                .map((detection) => (
                  <DetectionItem key={detection.id} detection={detection} onView={viewDetection} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedDetection && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedDetection.type}
                  {selectedDetection.isAlert && (
                    <Badge variant="destructive" className="ml-2">
                      Alert
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>Detection details and metadata</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="relative">
                  <img
                    src={selectedDetection.image || "/placeholder.svg"}
                    alt={selectedDetection.type}
                    className="w-full rounded-md object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                    Confidence: {(selectedDetection.confidence * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                    <p>{selectedDetection.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Detected</h4>
                    <p className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {selectedDetection.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm">View in Analytics</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

function DetectionItem({
  detection,
  onView,
}: {
  detection: Detection
  onView: (detection: Detection) => void
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-3">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
        <img src={detection.image || "/placeholder.svg"} alt={detection.type} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <p className="text-sm font-medium leading-none">{detection.type}</p>
          {detection.isAlert && (
            <Badge variant="destructive" className="ml-2">
              Alert
            </Badge>
          )}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          <span>{detection.timestamp}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onView(detection)}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  )
}

