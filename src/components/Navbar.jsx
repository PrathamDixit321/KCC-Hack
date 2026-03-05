"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Innovaite</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/hackathons" className="text-gray-600 hover:text-violet-600 font-medium transition-colors">
              Hackathons
            </Link>
            <Link href="/explore" className="text-gray-600 hover:text-violet-600 font-medium transition-colors">
              Explore
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-violet-600 font-medium transition-colors">
              Dashboard
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-gray-700 hover:text-violet-600 font-medium transition-colors">
              Log in
            </Link>
            <Link href="/register" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors">
              Sign up
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-gray-600 hover:text-violet-600" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link href="/hackathons" className="text-gray-700 hover:text-violet-600 font-medium py-1" onClick={() => setOpen(false)}>Hackathons</Link>
            <Link href="/explore" className="text-gray-700 hover:text-violet-600 font-medium py-1" onClick={() => setOpen(false)}>Explore</Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-violet-600 font-medium py-1" onClick={() => setOpen(false)}>Dashboard</Link>
            <hr className="border-gray-200" />
            <Link href="/login" className="text-gray-700 font-medium py-1" onClick={() => setOpen(false)}>Log in</Link>
            <Link href="/register" className="w-full text-center px-4 py-2 bg-violet-600 text-white font-medium rounded-lg" onClick={() => setOpen(false)}>Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
