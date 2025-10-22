"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";
import { CheckIcon } from "lucide-react";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    alert("Login functionality not implemented in this demo.");
  };

  const socialLogins = [
    {
      name: "Google",
      icon: <CheckIcon className="w-5 h-5" />,
      color: "bg-red-500",
    },
    {
      name: "Facebook",
      icon: <CheckIcon className="w-5 h-5" />,
      color: "bg-blue-600",
    },
    {
      name: "LinkedIn",
      icon: <CheckIcon className="w-5 h-5" />,
      color: "bg-blue-700",
    },
    {
      name: "GitHub",
      icon: <CheckIcon className="w-5 h-5" />,
      color: "bg-gray-800",
    },
  ];

  return (
    <>
      <NavbarHome />

      <main className="relative min-h-screen flex items-center justify-center pb-[150px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.jpg"
            alt="Login Background"
            layout="fill"
            objectFit="cover"
            quality={90}
            className=" bg-black"
          />
        </div>

        {/* Login Container */}
        <div className="relative z-10 bg-white/90 shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full mx-4">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Text Section */}
            <div
              className="
                bg-gradient-to-br from-primary/90 to-primary/70 
                text-white p-12 flex flex-col justify-center
                hidden md:flex
              "
            >
              <h1 className="text-4xl font-bold mb-6">
                Welcome Back to EZSportsRP
              </h1>
              <p className="text-xl mb-6">
                Manage your sports teams, track performance, and streamline
                communication with our comprehensive platform.
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center">
                  <CheckIcon className="mr-3 w-6 h-6" />
                  Advanced Team Management
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 w-6 h-6" />
                  Performance Analytics
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 w-6 h-6" />
                  Seamless Communication
                </li>
              </ul>
            </div>

            {/* Right Column - Login Form */}
            <div className="p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-center text-primary">
                Login to Your Account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-primary mb-2">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-primary mb-2">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="mr-2 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="remember" className="text-primary">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90"
                >
                  Log In
                </Button>
              </form>

              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-muted-foreground">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {socialLogins.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    className={`
                      flex items-center justify-center 
                      text-white ${social.color} 
                      hover:primary-50 border-none
                    `}
                  >
                    {social.icon}
                    <span className="ml-2">{social.name}</span>
                  </Button>
                ))}
              </div>

              <div className="text-center mt-6">
                <p className="text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterHome />
    </>
  );
}
