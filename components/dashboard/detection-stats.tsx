"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const barData = [
  { name: "Zebra Crossings", count: 42 },
  { name: "Garbage Bins", count: 38 },
  { name: "Traffic Signals", count: 27 },
  { name: "Vehicles", count: 65 },
  { name: "Pedestrians", count: 53 },
]

const pieData = [
  { name: "Zebra Crossings", value: 42, color: "#3b82f6" },
  { name: "Garbage Bins", value: 38, color: "#10b981" },
  { name: "Traffic Signals", value: 27, color: "#f59e0b" },
  { name: "Vehicles", value: 65, color: "#6366f1" },
  { name: "Pedestrians", value: 53, color: "#ec4899" },
]

const timeData = [
  { time: "00:00", detections: 12 },
  { time: "04:00", detections: 8 },
  { time: "08:00", detections: 47 },
  { time: "12:00", detections: 53 },
  { time: "16:00", detections: 60 },
  { time: "20:00", detections: 25 },
]

export default function DetectionStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="objects">
          <TabsList className="mb-4">
            <TabsTrigger value="objects">Objects</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="objects" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="distribution" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="timeline" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="detections" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

