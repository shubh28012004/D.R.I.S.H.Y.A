"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    securitySettings: {
      twoFactorAuth: false,
      passwordComplexity: "medium",
      sessionTimeout: 30,
    },
    accessControl: {
      maxLoginAttempts: 5,
      ipWhitelisting: false,
      userRoleManagement: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    },
  })
  const { toast } = useToast()

  const handleToggle = (category: keyof typeof settings, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }))
  }

  const handleInputChange = (category: keyof typeof settings, setting: string, value: string | number) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    // Here you would typically send the settings to your backend API
    console.log("Saving settings:", settings)
    toast({
      title: "Settings saved",
      description: "Your system settings have been updated successfully.",
    })
  }

  return (
    <Tabs defaultValue="security" className="space-y-4">
      <TabsList>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="access">Access Control</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your system's security parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
              </div>
              <Switch
                checked={settings.securitySettings.twoFactorAuth}
                onCheckedChange={() => handleToggle("securitySettings", "twoFactorAuth")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordComplexity">Password Complexity</Label>
              <select
                id="passwordComplexity"
                value={settings.securitySettings.passwordComplexity}
                onChange={(e) => handleInputChange("securitySettings", "passwordComplexity", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.securitySettings.sessionTimeout}
                onChange={(e) =>
                  handleInputChange("securitySettings", "sessionTimeout", Number.parseInt(e.target.value))
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Security Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="access">
        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
            <CardDescription>Configure access control settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.accessControl.maxLoginAttempts}
                onChange={(e) =>
                  handleInputChange("accessControl", "maxLoginAttempts", Number.parseInt(e.target.value))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>IP Whitelisting</Label>
                <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
              </div>
              <Switch
                checked={settings.accessControl.ipWhitelisting}
                onCheckedChange={() => handleToggle("accessControl", "ipWhitelisting")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>User Role Management</Label>
                <p className="text-sm text-muted-foreground">Enable granular user role management</p>
              </div>
              <Switch
                checked={settings.accessControl.userRoleManagement}
                onCheckedChange={() => handleToggle("accessControl", "userRoleManagement")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Access Control Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage system-wide notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send important updates via email</p>
              </div>
              <Switch
                checked={settings.notifications.emailNotifications}
                onCheckedChange={() => handleToggle("notifications", "emailNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
              </div>
              <Switch
                checked={settings.notifications.smsNotifications}
                onCheckedChange={() => handleToggle("notifications", "smsNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable in-app push notifications</p>
              </div>
              <Switch
                checked={settings.notifications.pushNotifications}
                onCheckedChange={() => handleToggle("notifications", "pushNotifications")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Notification Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

