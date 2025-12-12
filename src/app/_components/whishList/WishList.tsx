import { wishListProvider } from '@/Context/WishlistContext'
import React, { useContext } from 'react'

const WishList = ({ id }: { id: string }) => {
    const { addWishList, AddId, wishlistProducts } = useContext(wishListProvider)

    const heartData = wishlistProducts?.map(product => product._id)
    console.log(heartData);
    


    return (
        <button
            onClick={() => addWishList(id)}
        >
            {AddId == id ? "loading..." : 

heartData.includes(id)? "red":
            <i className="fa-solid fa-heart"></i>}


        </button>
    )
}

export default WishList
