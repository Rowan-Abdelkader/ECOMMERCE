import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// <<<<<<< HEAD
export async function middleware(request: NextRequest) {

const token = await getToken({req:request})
const {pathname} = request.nextUrl
const authPage =["/login" , "/register", "/forgetPassword"]
const routes =["/" , "/brands" , "/categories" ,"/cart" ,"/proudectDetials", "/wishlist"]
// =======
// This function can be marked `async` if using `await` inside
//  async function middleware(request: NextRequest) {

// const token = await getToken({req:request})
// //distructing pathname from req.url
// const {pathname} = request.nextUrl
// const authPage =["/login" , "/register"]
// const routes =["/" , "/brands" , "/categories" ,"/cart" ,"/proudectDetials" ]
// // >>>>>>> 2f5214098546bdb9e1e299307cc9aff62d26a148


if(!token && routes.includes(pathname)){
	return NextResponse.redirect(new URL('/login',request.url))
}

if (token && authPage.includes(pathname)){
	return NextResponse.redirect(new URL('/', request.url))
}
 
  return NextResponse.next()
}
// <<<<<<< HEAD
export const config = {
	//aly h7mihom
  matcher: ["/" , "/brands" , "/categories" ,"/cart" ,"/proudectDetials" ,"/login" ,"/register", "/wishlist", "/forgetPassword"],
// =======
// See "Matching Paths" below to learn more
// export const config = {
// 	//aly h7mihom
//   matcher: ["/" , "/brands" , "/categories" ,"/cart" ,"/proudectDetials" ,"/login" ,"/register"],
// // >>>>>>> 2f5214098546bdb9e1e299307cc9aff62d26a148
}

