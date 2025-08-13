import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { cn } from "../../components/ui/cn";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

const tabClass = (active: boolean) =>
  cn(
    "px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150",
    active ? "bg-white text-black shadow" : "bg-gray-100 text-gray-500 hover:text-black"
  );

export default function LandingAuth() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-white dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-150">
      {/* Navbar placeholder */}
      <div className="h-16" />
      <div className="flex flex-1 items-center justify-center px-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl">
          {/* Art/Info */}
          <div className="flex-1 flex flex-col items-start gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-indigo-700 dark:text-white transition-colors duration-150">
              Book Your Movie Tickets Effortlessly
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
              Experience the art of booking with CineBook. Fast, secure, and seamless ticketing for all your favorite movies and theaters.
            </p>
            <Button
              className="mt-2 px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-transform duration-150 hover:scale-105"
              onClick={() => setModalOpen(true)}
            >
              Book Now
            </Button>
            <img
              src="/projector tape.jpeg"
              alt="Movie Art"
              className="w-64 rounded-xl shadow-lg mt-6 hidden md:block"
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Modal Triggered Area */}
          <div className="flex-1 flex items-center justify-center">
            {/* Modal Overlay */}
            {modalOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-150"
                onClick={() => setModalOpen(false)}
              />
            )}
            {/* Modal */}
            <div
              className={cn(
                "z-50 fixed md:static w-full max-w-md mx-auto transition-all duration-200",
                modalOpen
                  ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 scale-100 pointer-events-auto"
                  : "pointer-events-none opacity-0 scale-95"
              )}
              style={{ boxShadow: modalOpen ? "0 8px 32px rgba(0,0,0,0.18)" : undefined }}
            >
              <Card className="overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b bg-gray-50 dark:bg-zinc-900">
                  <button
                    className={tabClass(tab === "login")}
                    onClick={() => setTab("login")}
                  >
                    Login
                  </button>
                  <button
                    className={tabClass(tab === "signup")}
                    onClick={() => setTab("signup")}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="p-6 bg-white dark:bg-zinc-900 transition-colors duration-150">
                  {tab === "login" ? <LoginForm /> : <SignupForm />}
                  <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
                    <span className="mx-2 text-gray-400 text-xs">or continue with</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" className="flex items-center gap-2" disabled>
                      <FcGoogle className="text-xl" /> Google
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" disabled>
                      <FaGithub className="text-xl text-gray-700 dark:text-white" /> GitHub
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" disabled>
                      <FaFacebook className="text-xl text-blue-600" /> Facebook
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      <Input type="email" placeholder="Email" required autoFocus />
      <Input type="password" placeholder="Password" required />
      <Button type="submit" className="w-full mt-2 transition-all duration-150">
        Login
      </Button>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="flex flex-col gap-4">
      <Input type="text" placeholder="Full Name" required autoFocus />
      <Input type="email" placeholder="Email" required />
      <Input type="password" placeholder="Password" required />
      <Button type="submit" className="w-full mt-2 transition-all duration-150">
        Sign Up
      </Button>
    </form>
  );
}
