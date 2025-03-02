"use client"

import Link from "next/link"
import { MoonIcon, SunIcon, BellIcon, MenuIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/providers/theme-provider"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminHeader() {
  const { setTheme, theme } = useTheme()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  useEffect(() => {
    // For demo purposes, we'll set a mock admin user
    setAdmin({ name: "Admin User", email: "admin@drishya.com" })
  }, [])

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem("isAdmin")
    router.push("/dashboard")
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setOpen(false)}>
                  D.R.I.S.H.Y.A Admin
                </Link>
                <Link
                  href="/admin"
                  className={`hover:text-primary ${isActive("/admin") ? "text-primary font-semibold" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className={`hover:text-primary ${isActive("/admin/users") ? "text-primary font-semibold" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  User Management
                </Link>
                <Link
                  href="/admin/settings"
                  className={`hover:text-primary ${isActive("/admin/settings") ? "text-primary font-semibold" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  System Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold">
            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs mr-1">ADMIN</span>
            D.R.I.S.H.Y.A
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link
              href="/admin"
              className={`hover:text-primary ${isActive("/admin") && !isActive("/admin/users") && !isActive("/admin/settings") ? "text-primary font-semibold" : ""}`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className={`hover:text-primary ${isActive("/admin/users") ? "text-primary font-semibold" : ""}`}
            >
              User Management
            </Link>
            <Link
              href="/admin/settings"
              className={`hover:text-primary ${isActive("/admin/settings") ? "text-primary font-semibold" : ""}`}
            >
              System Settings
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>Admin Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">New criminal record added</div>
                  <div className="text-xs text-muted-foreground mt-1">Record ID: CR-2023-0456</div>
                  <div className="text-xs text-muted-foreground">5 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">Alert rule updated</div>
                  <div className="text-xs text-muted-foreground mt-1">Violence detection threshold changed</div>
                  <div className="text-xs text-muted-foreground">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">System maintenance</div>
                  <div className="text-xs text-muted-foreground mt-1">Scheduled for tomorrow at 02:00 AM</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="justify-center">
                <Link href="/admin/notifications">View all notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {theme === "dark" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {admin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={admin.name} />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{admin.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{admin.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile">Admin Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">System Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Switch to User View</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

