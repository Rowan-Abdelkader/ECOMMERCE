"use server"
import { getMyToken } from "@/utilities/token"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
export async function getUserOrder () {

	const token = await getMyToken()
	const{id} = jwtDecode(token)
	if (!token){
		throw new Error ("Login First")
	}
	//user id
	const{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
	return data
}