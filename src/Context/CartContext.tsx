"use client";

import React, { createContext, useEffect, useState } from "react";
import { getUserCartAction } from "../CartActions/getUserCart";
import { Cart } from "@/types/cart.type";
import { AddToCartAction } from "@/CartActions/addToCart";
import { removeCartItemAction } from "@/CartActions/removeCartItem";
import { updateCartAction } from "@/CartActions/updateCart";
import { clearCartAction } from "@/CartActions/clearCart";
export const cartContext = createContext({});

const CartContext = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState("");

  async function addProductToCart(id: string) {
    try {
      const data = await AddToCartAction(id);
      if (data.status === "success") {
        await getUserCart(); // ← دي أهم خطوة علشان محتجش اعمل رفرش
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeCartItem(id: string) {
    try {
      const data: Cart = await removeCartItemAction(id);
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartItem(id: string, count: number) {
	try {
		
const data = await updateCartAction(id, count);
setNumOfCartItems(data.numOfCartItems);
setTotalCartPrice(data.data.totalCartPrice);
setProducts(data.data.products);
return data;
	} catch (error) {
		console.log(error);
	}
  }

  async function clearCart() {	

try {
	const data = await clearCartAction();
	setNumOfCartItems(0);
	setTotalCartPrice(0);
	setProducts([]);
	return data;
} catch (error) {
	console.log(error);
}
  }

    //hnstlm fe al get user cart al data alt gia mn al action
  async function getUserCart() {
    setIsLoading(true);
    try {
      const data: Cart = await getUserCartAction();
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      setCartId(data.cartId);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
}

  useEffect(() => {
    getUserCart();
  }, []);

  function afterPayment(){
	setNumOfCartItems(0);
	setTotalCartPrice(0);
	setProducts([]);
	setCartId("");
  }
  
  return (
    <cartContext.Provider
      value={{
        isLoading,
        numOfCartItems,
        totalCartPrice,
        products,
        getUserCart,
        addProductToCart,
		removeCartItem,
		updateCartItem,
		clearCart,
		cartId,
		afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContext;
