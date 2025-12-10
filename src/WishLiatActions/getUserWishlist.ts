"use server"
import { getMyToken } from "@/utilities/token";
export async function getUserWishlist(){

  const token = await getMyToken();

 if (!token) { 
	throw new Error('Login First')
}
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: token as string
        }
      });
const data = await response.json()	
if (!response.ok) {

	throw new Error ('Failed to fetch wishlist')
}
return data
};

