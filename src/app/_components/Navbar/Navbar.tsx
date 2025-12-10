"use client";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "./../../../screens/freshcart-logo.svg";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { cartContext } from "@/Context/CartContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { data, status } = useSession();
  const { numOfCartItems } = useContext(cartContext);


  console.log("Session status:", status);
  console.log("Session data:", data);

  signOut;

  return (
    <div className=" bg-slate-200 py-5">
      <div className=" w-full md:w-[80%] mx-auto flex flex-col md:flex-row text-center justify-between items-center">
        {/* logo && links */}

        <ul className="flex flex-col md:flex-row text-center gap-6">
          <li>
            <Link href="/">
              <Image src={logo} alt="Logo" />
            </Link>
          </li>

          {status === "loading" && (
            <>
              <h1>loading</h1>
            </>
          )}

          {status === "authenticated" && (
            <>
              <li>
                <Link href="/category">Category</Link>
              </li>
              <li>
                <Link href="/allorders">All Orders</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
			  <li>
                <Link href="/wishlist">wish list</Link>
              </li>
              <li className="relative">
                <Link href="/cart">
                  Cart
                  <Badge className="absolute -top-[25%] mx-1">
                    {numOfCartItems}
                  </Badge>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* icons && buttons */}

        <div>
          <ul className="flex flex-col md:flex-row text-center gap-2">
            {status === "unauthenticated" && (
              <>
                <li className="font-semibold me-3">
                  <Link href="/login">Login</Link>
                </li>
                <li className="font-semibold">
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
            {status === "authenticated" && (
              <li className="flex items-center gap-4">
                <ul className="flex flex-row items-center gap-4">
                  <li>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="font-semibold ms-5"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
