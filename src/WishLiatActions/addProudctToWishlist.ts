"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addProductToWishlist(productId: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Unauthorized");
  }
const values = {
    productId: productId,
  };
  const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, values, {
    headers: {
      token: token
    }
  });
  return data;
}
