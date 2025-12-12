import { wishListProvider } from '@/Context/WishlistContext'
import React, { useContext } from 'react'

const DeleteWishBtn = ({wish,id}:{wish:boolean,id:string}) => {
    const {DeleteProduct,DeleteId} = useContext(wishListProvider)
    return (
        <button onClick={()=>DeleteProduct(id)} className={`${wish ? "block" : "hidden"} w-[80%] bg-red-500 rounded-lg py-1 text-white flex items-center justify-center gap-2`}>
           {DeleteId==id?"loading...":"delete"} 
            </button>

    )
}

export default DeleteWishBtn
