"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";		

export async function removeWish(productId: string) {

  const token = await getMyToken();		
  if (!token) {
  throw Error("Login First");
}

  const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    headers: {
      token: token as string
    }
  });
  return data;
	  }
	  