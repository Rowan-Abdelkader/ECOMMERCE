import { wishListProvider } from '@/Context/WishlistContext'
import React, { useContext } from 'react'

type WishlistProduct = {
  _id: string
  title: string
  price: number
  imageCover: string
}

type WishListContextType = {
  addWishList: (id: string) => void
  AddId: string | null
  wishlistProducts?: WishlistProduct[]
}

const WishList = ({ id }: { id: string }) => {
  const { addWishList, AddId, wishlistProducts } =
    useContext(wishListProvider) as WishListContextType

  const isInWishlist = wishlistProducts?.some(
    item => item._id === id
  )

  return (
    <button onClick={() => addWishList(id)}>
      {AddId === id ? (
        'loading...'
      ) : (
        <i
          className="fa-solid fa-heart"
          style={{ color: isInWishlist ? 'red' : 'gray' }}
        ></i>
      )}
    </button>
  )
}

export default WishList
