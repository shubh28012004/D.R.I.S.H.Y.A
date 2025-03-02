"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle, Bell, Send, Settings } from "lucide-react"

export default function AdminAlertSystem() {
  const { toast } = useToast()
  const [alertSettings, setAlertSettings] = useState({
    violenceDetection: true,
    criminalRecognition: true,
    suspiciousActivity: false,
    trafficViolations: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    confidenceThreshold: 75,
  })

  const handleSettingChange = (setting: string, value: boolean | number) => {
    setAlertSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Alert system settings have been updated",
    })
  }

  const handleTestAlert = () => {
    toast({
      title: "Test alert sent",
      description: "A test alert has been sent to all configured channels",
    })
  }

  return (
    <Tabs defaultValue="settings">
      <TabsList className="mb-4">
        <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        <TabsTrigger value="rules">Alert Rules</TabsTrigger>
        <TabsTrigger value="history">Alert History</TabsTrigger>
      </TabsList>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Alert System Configuration</CardTitle>
            <CardDescription>Configure how and when alerts are triggered and sent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Alert Types</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Violence Detection Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alert when violence is detected in video feeds</p>
                  </div>
                  <Switch
                    checked={alertSettings.violenceDetection}
                    onCheckedChange={(checked) => handleSettingChange("violenceDetection", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Criminal Recognition Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert when known criminals are recognized in video feeds
                    </p>
                  </div>
                  <Switch
                    checked={alertSettings.criminalRecognition}
                    onCheckedChange={(checked) => handleSettingChange("criminalRecognition", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Suspicious Activity Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alert when suspicious behavior is detected</p>
                  </div>
                  <Switch
                    checked={alertSettings.suspiciousActivity}
                    onCheckedChange={(checked) => handleSettingChange("suspiciousActivity", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Traffic Violation Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alert when traffic violations are detected</p>
                  </div>
                  <Switch
                    checked={alertSettings.trafficViolations}
                    onCheckedChange={(checked) => handleSettingChange("trafficViolations", checked)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts via email</p>
                  </div>
                  <Switch
                    checked={alertSettings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts via browser push notifications</p>
                  </div>
                  <Switch
                    checked={alertSettings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts via SMS (additional charges may apply)</p>
                  </div>
                  <Switch
                    checked={alertSettings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Alert Thresholds</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="confidenceThreshold">
                      Confidence Threshold ({alertSettings.confidenceThreshold}%)
                    </Label>
                  </div>
                  <Input
                    id="confidenceThreshold"
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={alertSettings.confidenceThreshold}
                    onChange={(e) => handleSettingChange("confidenceThreshold", Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">Minimum confidence level required to trigger an alert</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleTestAlert}>
              <Bell className="mr-2 h-4 w-4" />
              Test Alert
            </Button>
            <Button onClick={handleSaveSettings}>
              <Settings className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="rules">
        <Card>
          <CardHeader>
            <CardTitle>Alert Rules</CardTitle>
            <CardDescription>Configure specific rules for when alerts should be triggered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">High Danger Criminal Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      Alert when criminals with "High" danger level are detected
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Violence in School Zones</h3>
                    <p className="text-sm text-muted-foreground">
                      Alert when violence is detected near schools with higher priority
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">After Hours Activity</h3>
                    <p className="text-sm text-muted-foreground">
                      Alert when activity is detected in restricted areas after business hours
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Multiple Detections</h3>
                    <p className="text-sm text-muted-foreground">
                      Alert when the same criminal is detected in multiple locations within 1 hour
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Crowd Formation</h3>
                    <p className="text-sm text-muted-foreground">
                      Alert when unusual crowd formations are detected in monitored areas
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Add New Rule
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Alert History</CardTitle>
            <CardDescription>View recent alerts that have been triggered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-destructive">Criminal Recognition Alert</h3>
                  <span className="text-xs text-muted-foreground">Today, 10:45 AM</span>
                </div>
                <p className="text-sm mb-2">
                  High danger criminal "John Doe" detected at Downtown Plaza with 92% confidence.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-3 w-3" />
                    Resend Alert
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-destructive">Violence Detection Alert</h3>
                  <span className="text-xs text-muted-foreground">Today, 09:12 AM</span>
                </div>
                <p className="text-sm mb-2">Violence detected at Central Park with 87% confidence.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-3 w-3" />
                    Resend Alert
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Suspicious Activity Alert</h3>
                  <span className="text-xs text-muted-foreground">Yesterday, 11:30 PM</span>
                </div>
                <p className="text-sm mb-2">
                  Suspicious activity detected at Main Street Bank after hours with 78% confidence.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-3 w-3" />
                    Resend Alert
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Criminal Recognition Alert</h3>
                  <span className="text-xs text-muted-foreground">Yesterday, 08:15 PM</span>
                </div>
                <p className="text-sm mb-2">
                  Medium danger criminal "Jane Smith" detected at Shopping Mall with 85% confidence.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-3 w-3" />
                    Resend Alert
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Alert History
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

