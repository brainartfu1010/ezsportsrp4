"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList
} from "@/components/ui/navigation-menu"

export function NavbarHome() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-center flex">
      <div className="container max-w-7xl flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo-big.png" 
            alt="EZSports RP Logo" 
            width={80} 
            height={80} 
            className="mr-2"
          /> 
          <span className="font-bold text-2xl">EZSports RP</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            {/* Features */}
            <NavigationMenuItem>
              <Link 
                href="/features" 
                className="text-base font-bold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Features
              </Link>
            </NavigationMenuItem>

            {/* Pricing */}
            <NavigationMenuItem>
              <Link 
                href="/pricing" 
                className="text-base font-bold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Pricing
              </Link>
            </NavigationMenuItem>

            {/* About */}
            <NavigationMenuItem>
              <Link 
                href="/about" 
                className="text-base font-bold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                About
              </Link>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <Link 
                href="/contact" 
                className="text-base font-bold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Contact
              </Link>
            </NavigationMenuItem>

            {/* App Demo */}
            <NavigationMenuItem>
              <Link 
                href="/app/dashboard" 
                className="text-base font-bold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                App Demo
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
