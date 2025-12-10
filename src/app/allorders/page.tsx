import { getUserOrder } from '@/apis/getUserOrders'
import React from 'react'
import { CartItem,Orders,Order } from '@/types/order.type'
import Image from "next/image"

const AllOrders = async () => {
	const data: Orders = await getUserOrder()
	console.log("data:",  data)

	return (
		<div className='w-[80%] mx-auto w-full my-10 px-5 md:px-0'>
			<div className='p-5 allOrders '>
				{data.map(function(order:Order , idx:number){
					return <div className='p-5 bg-slate-100 mb-5' key={idx}>
						<div className='flex'>
							{order.cartItems.map(function(item:CartItem , idx:number){
								return <div key={idx} className='w-1/6 me-3'>
									<Image src={item.product.imageCover} alt="" width={200} height={200} className="w-full"/>
									<h2 className='line-clamp-1'>{item.product.title}</h2>
								</div>
							})}
						</div>
					</div>
				})}
			</div>
		</div>
	)
}

export default AllOrders
