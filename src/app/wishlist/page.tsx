"use client";
import React, { useContext, useEffect } from "react";
import MyCards from "@/_components/MyCards/MyCards";

import { wishListProvider } from "@/Context/WishlistContext";
export default function WishlistPage() {

const {wishlistProducts} = useContext(wishListProvider)





  return (
    <section className="w-[85%] mx-auto py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-5">My Wishlist ❤️</h1>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((product) => (
            <MyCards key={product._id} product={product} wish={true} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">
          No items in your wishlist yet.
        </p>
      )}
    </section>
  );
}