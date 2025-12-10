"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { addProductToWishlist } from "@/WishLiatActions/addProudctToWishlist";
import { removeProductFromWishlist } from "@/WishLiatActions/removeProudctFromWishlist";
import { getUserWishlist } from "@/WishLiatActions/getUserWishlist";
import { toast } from "sonner";
import { CheckCircleIcon } from 'lucide-react';


export const WishlistContext = createContext({});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistCount, setWishlistCount] = useState(0);

  //awel lma al user ysgl hatly al rkam
  useEffect(() => {
    setWishlistCount(wishlist.length);
  }, [wishlist]);
  
  useEffect(() => {
    getWishlist();
  }, []);

  async function getWishlist() {
    setLoading(true);
    try {
      const data = await getUserWishlist();
      setWishlist(data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }

  async function addToWishlist(productId: string) {
    try {
      const data = await addProductToWishlist(productId);
      toast.success(data.message, {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-green-500" />,
      });
       await getWishlist();
      return data;
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Failed to add product to wishlist", {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-red-500" />,
      });
    }
  }

  async function removeFromWishlist(productId: string) {
    try {
      const data = await removeProductFromWishlist(productId);
      toast.success(data.message, {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-green-500" />,
      });
      await getWishlist();
      return data;
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Failed to remove product from wishlist", {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-red-500" />,
      });
    }
  }

  function isInWishlist(productId: string) {
    return wishlist.map(product => product._id).includes(productId);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        removeFromWishlist,
        getWishlist,
        addToWishlist,
        loading,
        wishlistCount,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
