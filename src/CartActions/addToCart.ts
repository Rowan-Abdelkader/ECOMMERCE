"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";
export async function AddToCartAction(id: string) {
  const token = await getMyToken();
  
if (!token) {
	throw new Error("Login required");	
}

//from link api y3ny ytl=ktb zay ma hwa
  const values = {
    productId: id,
  };
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    values,
    {
      headers: {
        token: token,
      },
    }
  );
  return data;
}