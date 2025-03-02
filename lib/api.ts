// This is a mock API service. Replace with actual API calls when available.

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "user"
}

export interface CriminalRecord {
  id: string
  name: string
  age: number
  crimeType: string
  lastSeen: string
  status: "Active" | "Inactive"
  dangerLevel: "Low" | "Medium" | "High"
  dateAdded: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  adminLogin: async (email: string, password: string): Promise<AdminUser | null> => {
    await delay(1000) // Simulate network delay
    if (email === "admin@drishya.com" && password === "admin123") {
      return {
        id: "1",
        name: "Admin User",
        email: "admin@drishya.com",
        role: "admin",
      }
    }
    return null
  },

  getCriminalRecords: async (): Promise<CriminalRecord[]> => {
    await delay(1000)
    return [
      {
        id: "CR-2023-0001",
        name: "John Doe",
        age: 32,
        crimeType: "Theft",
        lastSeen: "Downtown Plaza",
        status: "Active",
        dangerLevel: "Medium",
        dateAdded: "2023-01-15",
      },
      {
        id: "CR-2023-0002",
        name: "Jane Smith",
        age: 28,
        crimeType: "Assault",
        lastSeen: "Central Park",
        status: "Active",
        dangerLevel: "High",
        dateAdded: "2023-02-20",
      },
      {
        id: "CR-2023-0003",
        name: "Robert Johnson",
        age: 45,
        crimeType: "Vandalism",
        lastSeen: "Main Street",
        status: "Inactive",
        dangerLevel: "Low",
        dateAdded: "2023-03-10",
      },
    ]
  },

  addCriminalRecord: async (record: Omit<CriminalRecord, "id" | "dateAdded">): Promise<CriminalRecord> => {
    await delay(1000)
    const newRecord: CriminalRecord = {
      ...record,
      id: `CR-2023-${Math.floor(1000 + Math.random() * 9000)}`,
      dateAdded: new Date().toISOString().split("T")[0],
    }
    return newRecord
  },

  deleteCriminalRecord: async (id: string): Promise<boolean> => {
    await delay(1000)
    return true
  },

  getUsers: async (): Promise<AdminUser[]> => {
    await delay(1000)
    return [
      { id: "1", name: "Admin User", email: "admin@drishya.com", role: "admin" },
      { id: "2", name: "John Doe", email: "john@example.com", role: "user" },
      { id: "3", name: "Jane Smith", email: "jane@example.com", role: "user" },
    ]
  },

  addUser: async (user: Omit<AdminUser, "id">): Promise<AdminUser> => {
    await delay(1000)
    const newUser: AdminUser = {
      ...user,
      id: Math.floor(1000 + Math.random() * 9000).toString(),
    }
    return newUser
  },

  deleteUser: async (id: string): Promise<boolean> => {
    await delay(1000)
    return true
  },

  // Add more admin-related API functions here
}

