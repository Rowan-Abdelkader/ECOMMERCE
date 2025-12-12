"use client"
import { addProductToWishlist } from '@/WishLiatActions/addProudctToWishlist';
import { getUserWishlist } from '@/WishLiatActions/getUserWishlist';
import { removeWish } from '@/WishLiatActions/removeProudctFromWishlist';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
export const wishListProvider = createContext({})
const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [DeleteId, setDeleteId] = useState("");
    const [AddId, setAddId] = useState("");
    // ------------------------get data-------------------------------------
    async function getWishList() {
        try {
            const data = await getUserWishlist();
            setWishlistProducts(data?.data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const confirm = () => getWishList()
        confirm()
    }, [])
    // --------------------------add product---------------------------
    async function addWishList(id: string) {
        setAddId(id)
        const data = await addProductToWishlist(id)
        if (data.status == "success") {
            getWishList()
            toast.success("product add successfully", {
                position: "top-right",
                duration: 4000,
            });
        } else {
            toast.error("some thing went wrong", {
                position: "top-right",
                duration: 4000,
            });
        }
        setAddId("")
    }
    // -------------------------delete product-----------------
    async function DeleteProduct(id: string) {
        setDeleteId(id)
        const data = await removeWish(id)
        if (data.status == "success") {
            getWishList()
            toast.success("product removed successfully", {
                position: "top-right",
                duration: 4000,
            });
        } else {
            toast.error("some thing went wrong", {
                position: "top-right",
                duration: 4000,
            });
        }
        setDeleteId("")
    }
    return (
        <wishListProvider.Provider value={{ wishlistProducts, loading, addWishList, DeleteProduct, DeleteId, AddId }}>
            {children}
        </wishListProvider.Provider>
    )
}

export default WishlistProvider
