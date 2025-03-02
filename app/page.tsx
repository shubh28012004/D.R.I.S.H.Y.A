import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Camera, BarChart3, AlertTriangle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    <header className="bg-primary text-primary-foreground py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">D.R.I.S.H.Y.A</h1>
          
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
        <p className="mt-2 text-primary-foreground/80">
          Deep Recognition for Infrastructure, Safety, and Holistic Yield Analysis
        </p>
      </div>
    </header>

      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Smart Surveillance System</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              Advanced object detection and analysis for urban infrastructure monitoring and safety
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/dashboard">Launch Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Camera className="h-10 w-10 text-primary" />}
                title="Live Detection"
                description="Stream processed video frames with real-time object detection and bounding boxes"
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Safety Monitoring"
                description="Detect zebra crossings, traffic elements, and potential safety hazards"
              />
              <FeatureCard
                icon={<AlertTriangle className="h-10 w-10 text-primary" />}
                title="Violence Detection"
                description="Receive instant alerts when potential violence is detected in video feeds"
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Analytics Dashboard"
                description="Comprehensive statistics and reports on detected objects and events"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

