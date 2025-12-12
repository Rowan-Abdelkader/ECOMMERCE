"use client";

import CartContextProvider from "@/Context/CartContext";


import { SessionProvider } from "next-auth/react";
import React from "react";
import WishlistProvider from "@/Context/WishlistContext";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <WishlistProvider>
        <CartContextProvider>
          {children}
        </CartContextProvider>
      </WishlistProvider>
    </SessionProvider>
  );
};

export default Providers;
