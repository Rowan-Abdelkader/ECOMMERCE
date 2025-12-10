"use client";

import CartContextProvider from "@/Context/CartContext";
import { WishlistProvider } from "@/Context/WishlistContext";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartContextProvider>
    </SessionProvider>
  );
};

export default Providers;
