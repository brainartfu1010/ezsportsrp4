"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NavbarHome } from "@/components/layout/navbars/navbar-home"

export default function Home() {
  return (
    <>
      <NavbarHome />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-6">EZSports RP</h1>
          <p className="text-muted-foreground">Welcome to the EZSports Role-Playing Platform</p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Begin your sports role-playing adventure</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <Button>Create Character</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Explore Leagues</CardTitle>
              <CardDescription>Join competitive sports leagues</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <Button variant="secondary">Browse Leagues</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
              <CardDescription>Connect with other players</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <Button variant="outline">Join Community</Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}
