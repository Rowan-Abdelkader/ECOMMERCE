"use client";
import React, { useEffect, useState } from "react";
import MyCards from "@/_components/MyCards/MyCards";
import { getUserWishlist } from "@/WishLiatActions/getUserWishlist";
export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
          const data = await getUserWishlist();
        console.log("Wishlist from server:", data);
setWishlistProducts(data?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 my-10">Loading...</p>;
  }

  return (
    <section className="w-[85%] mx-auto py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-5">My Wishlist ❤️</h1>

      {wishlistProducts.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {wishlistProducts.map((product) => (
            <MyCards key={product._id} product={product} />
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