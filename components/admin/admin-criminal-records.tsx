"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle, Search, Trash2, Edit, Download } from "lucide-react"
import { api, type CriminalRecord } from "@/lib/api"

export default function AdminCriminalRecords() {
  const [records, setRecords] = useState<CriminalRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newRecord, setNewRecord] = useState({
    name: "",
    age: "",
    crimeType: "",
    lastSeen: "",
    dangerLevel: "Medium" as const,
    status: "Active" as const,
    description: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCriminalRecords()
  }, [])

  const fetchCriminalRecords = async () => {
    setIsLoading(true)
    try {
      const fetchedRecords = await api.getCriminalRecords()
      setRecords(fetchedRecords)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch criminal records",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewRecord((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddRecord = async () => {
    if (!newRecord.name || !newRecord.crimeType || !newRecord.lastSeen) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const addedRecord = await api.addCriminalRecord(newRecord)
      setRecords([addedRecord, ...records])
      setIsAddDialogOpen(false)
      setNewRecord({
        name: "",
        age: "",
        crimeType: "",
        lastSeen: "",
        dangerLevel: "Medium",
        status: "Active",
        description: "",
      })
      toast({
        title: "Success",
        description: `Criminal record ${addedRecord.id} has been added`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add criminal record",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRecord = async (id: string) => {
    setIsLoading(true)
    try {
      await api.deleteCriminalRecord(id)
      setRecords(records.filter((record) => record.id !== id))
      toast({
        title: "Record deleted",
        description: `Criminal record ${id} has been removed`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete criminal record",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportRecords = () => {
    const csvContent = [
      ["ID", "Name", "Age", "Crime Type", "Last Seen", "Danger Level", "Status", "Date Added"],
      ...records.map((record) => [
        record.id,
        record.name,
        record.age.toString(),
        record.crimeType,
        record.lastSeen,
        record.dangerLevel,
        record.status,
        record.dateAdded,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "criminal_records.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.crimeType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Criminal Record</DialogTitle>
                <DialogDescription>Enter the details of the new criminal record.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newRecord.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={newRecord.age}
                      onChange={handleInputChange}
                      placeholder="30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="crimeType">Crime Type *</Label>
                    <Input
                      id="crimeType"
                      name="crimeType"
                      value={newRecord.crimeType}
                      onChange={handleInputChange}
                      placeholder="Theft, Assault, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastSeen">Last Seen Location *</Label>
                    <Input
                      id="lastSeen"
                      name="lastSeen"
                      value={newRecord.lastSeen}
                      onChange={handleInputChange}
                      placeholder="Downtown Plaza"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dangerLevel">Danger Level</Label>
                  <select
                    id="dangerLevel"
                    name="dangerLevel"
                    value={newRecord.dangerLevel}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newRecord.description}
                    onChange={handleInputChange}
                    placeholder="Additional details about the criminal..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRecord}>Add Record</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleExportRecords}>
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b">
          <div className="col-span-1">ID</div>
          <div className="col-span-1">Name</div>
          <div className="col-span-1">Age</div>
          <div className="col-span-1">Crime Type</div>
          <div className="col-span-2">Last Seen</div>
          <div className="col-span-1">Danger Level</div>
          <div className="col-span-1">Actions</div>
        </div>
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">Loading...</div>
        ) : filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div key={record.id} className="grid grid-cols-8 gap-4 p-4 border-b">
              <div className="col-span-1 text-sm">{record.id}</div>
              <div className="col-span-1 text-sm">{record.name}</div>
              <div className="col-span-1 text-sm">{record.age}</div>
              <div className="col-span-1 text-sm">{record.crimeType}</div>
              <div className="col-span-2 text-sm">{record.lastSeen}</div>
              <div className="col-span-1 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    record.dangerLevel === "High"
                      ? "bg-destructive/20 text-destructive"
                      : record.dangerLevel === "Medium"
                        ? "bg-yellow-500/20 text-yellow-700"
                        : "bg-green-500/20 text-green-700"
                  }`}
                >
                  {record.dangerLevel}
                </span>
              </div>
              <div className="col-span-1 flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No criminal records found. Try adjusting your search or add a new record.
          </div>
        )}
      </div>
    </>
  )
}

