"use client"

import Link from "next/link"
import { MoonIcon, SunIcon, BellIcon, MenuIcon, ShieldIcon } from "lucide-react"
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
import AdminLoginDialog from "@/components/admin/admin-login-dialog"

export default function DashboardHeader() {
  const { setTheme, theme } = useTheme()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    const storedIsAdmin = localStorage.getItem("isAdmin")
    setIsAdmin(storedIsAdmin === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isAdmin")
    setUser(null)
    setIsAdmin(false)
    router.push("/login")
  }

  const handleAdminLogin = (success: boolean) => {
    setIsAdminLoginOpen(false)
    if (success) {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", "true")
      router.push("/admin")
    }
  }

  const handleSwitchToUserView = () => {
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
                  D.R.I.S.H.Y.A
                </Link>
                <Link
                  href="/dashboard"
                  className={`hover:text-primary ${isActive("/dashboard") ? "text-primary font-semibold" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/detections"
                  className={`hover:text-primary ${isActive("/dashboard/detections") ? "text-primary font-semibold" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Detections
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            D.R.I.S.H.Y.A
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`hover:text-primary ${isActive("/dashboard") ? "text-primary font-semibold" : ""}`}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/detections"
              className={`hover:text-primary ${isActive("/dashboard/detections") ? "text-primary font-semibold" : ""}`}
            >
              Detections
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
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">New detection alert</div>
                  <div className="text-xs text-muted-foreground mt-1">Violence detected at Downtown Plaza</div>
                  <div className="text-xs text-muted-foreground">2 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">System update</div>
                  <div className="text-xs text-muted-foreground mt-1">Detection model has been updated</div>
                  <div className="text-xs text-muted-foreground">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">Criminal record match</div>
                  <div className="text-xs text-muted-foreground mt-1">Potential match found in Main Street</div>
                  <div className="text-xs text-muted-foreground">3 hours ago</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="justify-center">
                <Link href="/dashboard/notifications">View all notifications</Link>
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile/edit">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isAdmin ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSwitchToUserView}>
                      <ShieldIcon className="mr-2 h-4 w-4" />
                      <span>Switch to User View</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onSelect={() => setIsAdminLoginOpen(true)}>
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    <span>Log in as Admin</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
      <AdminLoginDialog open={isAdminLoginOpen} onOpenChange={setIsAdminLoginOpen} onLogin={handleAdminLogin} />
    </header>
  )
}

