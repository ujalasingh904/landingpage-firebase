'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebaseconfig";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Image from "next/image"; 

export default function Header() {

  const getUserFromSession = () => {
    const storedUser = sessionStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from session storage", error);
      return null;
    }
  }

  const [user, setUser] = useState<User | null>(getUserFromSession());
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        sessionStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        sessionStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    sessionStorage.removeItem("user");
    setMenuOpen(false);
  };

  console.log("user is", user)
  return (
    <header className="bg-white shadow-sm border-b-2 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Logo
        </Link>
        <nav>
          {user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)}>
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
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
