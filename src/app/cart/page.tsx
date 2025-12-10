"use client";

import React, { useContext } from "react";
import { cartContext } from "@/Context/CartContext";
import Loading from "../loading";
import { Button } from "@/_components/ui/button";
import { ProductCart } from "@/types/cart.type";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const Cart = () => {
  const {
    products,
    isLoading,
    totalCartPrice,
    removeCartItem,
    updateCartItem,
    clearCart,

  } = useContext(cartContext);

  async function removeItem(id: string) {
    const data = await removeCartItem(id);

    if (data.status === "success") {
      toast.success("Product deleted successfully!", {
        duration: 2000,
        position: "top-center",
        icon: <CheckCircle className="text-green-500" />,
      });
    } else {
      toast.error("Failed to delete product from cart.", {
        duration: 2000,
        position: "top-center",
        icon: <CheckCircle className="text-red-500" />,
      });
    }
  }



  async function updateCart(id: string, count: number) {
    const data = await updateCartItem(id, count);

    if (data.status === "success") {
      toast.success("Product updated successfully!", {
        duration: 2000,
        position: "top-center",
        icon: <CheckCircle className="text-green-500" />,
      });
    } else {
      toast.error("Failed to update product in cart.", {
        duration: 2000,
        position: "top-center",
        icon: <CheckCircle className="text-red-500" />,
      });
    }
  }


  if (isLoading) {
    return <Loading />;
  }
  if (products.length === 0) {
    return <div className="flex justify-center items-center h-screen">
	<h1 className="text-5xl text-yellow-500 font-bold">Your cart is empty</h1>
	</div>;
  }


  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Shop Cart :</h1>
        <p className="mb-5 text-green-500 font-mono">
          Total Price: {totalCartPrice} EGP
        </p>
        <Button onClick={clearCart} className="mb-10 mr-5 bg-teal-700 hover:bg-teal-600">Clear cart</Button>
  <Button className=" bg-teal-700 hover:bg-teal-600">
    <Link href="/payment">Payment</Link>
  </Button>


        <div className="allProducts flex flex-col gap-5">
          {products?.map((product: ProductCart, idx: number) => {
            return (
              <div key={idx} className=" flex flex-col ">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="w-[220px] h-[250px] flex-shrink-0">
                      <Image
                        src={product.product.imageCover}
                        alt={product.product.title}
                        width={220}
                        height={250}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div>
                      <h1 className="text-lg font-bold">
                        {product.product.title}
                      </h1>
                      <p className="text-green-500 pt-1">
                        price: {product.price} EGP
                      </p>
                      <Button
                        onClick={() => removeItem(product.product.id)}
                        className="mt-5"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() =>
                        updateCart(product.product.id, product.count + 1)
                      }
                    >
                      {" "}
                      +{" "}
                    </Button>
                    <p>{product.count}</p>
                    <Button
                      onClick={() =>
                        updateCart(product.product.id, product.count - 1)
                      }
                    >
                      {" "}
                      -
                    </Button>

                  </div>
                </div>
                <hr className="border-gray-300  mt-5" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
	
  );
};

export default Cart;
