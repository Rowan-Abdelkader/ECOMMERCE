"use client";

import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "@/Context/WishlistContext";
import { Button } from "@/_components/ui/button";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/_components/ui/card";
import Link from "next/link";
import { product } from "../../types/product.t";
import AddBtnCart from "../AddBtnCart/AddBtnCart";

const MyCards = ({ product }: { product: product }) => {
 const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext) 
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(isInWishlist(product._id)); 
  }, [product._id, isInWishlist]);

  async function toggleWishlist() {
    if (like) {
      setLike(false); 
      await removeFromWishlist(product._id);
    } else {
      setLike(true);
      await addToWishlist(product._id);
    }
  }
  const { wishlist, settoggleWishlist } = useContext(WishlistContext);
  const isInWishlist = wishlist.includes(product.id);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
      <div className="inner">
        <Card>
          <Link href={`/proudectDetails/${product.id}`}>
            <CardHeader>
              <Image
                width={300}
                height={200}
                src={product.imageCover}
                alt={product.title}
              />
            </CardHeader>
            <CardContent>
              <p className="font-bold text-fuchsia-700">
                {product.category.name}
              </p>
              <p className="line-clamp-1">{product.title}</p>
            </CardContent>
          </Link>

          <CardFooter className="flex flex-col items-center gap-3">
            <div className="flex justify-between w-full">
              <p>{product.price} EGP</p>
              <p>
                {product.ratingsAverage}
                <i className="fa-solid fa-star text-yellow-400"></i>
              </p>
            </div>

            <div className="flex justify-end w-full">
              <button

                onClick={(e) => {
                  e.preventDefault();
                  settoggleWishlist(product._id);
                }}
                className={`text-2xl transition-all duration-300 ${
                  isInWishlist

                    ? "text-red-500 scale-110"
                    : "text-gray-400 hover:text-red-400 hover:scale-110"
                }`}
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </CardFooter>

          <div className="flex justify-center mt-4">
            <AddBtnCart id={product.id} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyCards;
