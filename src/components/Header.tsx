'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebaseconfig";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Image from "next/image";

export default function Header() {

  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMenuOpen(false);
  };

  console.log("user is", user)
  return (
    <header className="bg-white shadow-sm border-b-2 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Logo
        </Link>
        <ul className="flex space-x-12">
          <li>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/services" className="text-gray-600 hover:text-gray-800">
              Services
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-600 hover:text-gray-800">
              Blog
            </Link>
          </li>

        </ul>
        <nav>
          {user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center">
                <Image
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full border cursor-pointer"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-30  rounded-lg shadow-lg">
                  <Button
                    onClick={handleLogout}
                    className="w-full text-left text-black py-2 px-4  bg-gray-100 hover:bg-white-200 hover:opacity-90"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="text-black">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
