"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function HowToUse() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
      <div className="flex items-center justify-between space-x-4 px-1">
        <h4 className="text-sm font-semibold">How to use D.R.I.S.H.Y.A</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">
        <div className="rounded-md border px-4 py-3 text-sm">
          <h5 className="font-medium">Getting Started</h5>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Sign in with your credentials or create a new account</li>
            <li>Navigate to the dashboard to access all features</li>
            <li>Configure your detection settings in the Settings page</li>
            <li>Start monitoring with the live feed</li>
          </ol>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">
          <h5 className="font-medium">Live Detection Feed</h5>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Go to the "Dashboard" page</li>
            <li>Locate the "Live Detection Feed" card</li>
            <li>Click the "Play" button to start the feed</li>
            <li>Observe real-time object detection results</li>
            <li>Use the "Refresh" button to update the feed if needed</li>
          </ol>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">
          <h5 className="font-medium">Checking Detection Results</h5>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Navigate to the "Detections" page</li>
            <li>Use filters to narrow down results by type or date</li>
            <li>Click on individual detection cards for detailed information</li>
            <li>Review detection confidence scores and timestamps</li>
          </ol>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">
          <h5 className="font-medium">Viewing Past Detections</h5>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Go to the "Detections" page</li>
            <li>Scroll through the list of past detections</li>
            <li>Use the search bar to find specific detections</li>
            <li>Click "View" on a detection card for more details</li>
            <li>Access detection history and analytics from this page</li>
          </ol>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">
          <h5 className="font-medium">Customizing Settings</h5>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Navigate to the "Settings" page</li>
            <li>Adjust detection parameters like confidence thresholds</li>
            <li>Configure notification preferences</li>
            <li>Manage API settings and connections</li>
            <li>Save your changes to apply new settings</li>
          </ol>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

