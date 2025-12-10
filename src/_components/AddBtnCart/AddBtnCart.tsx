"use client";

import React, { useContext ,useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { cartContext } from "@/Context/CartContext";

const AddBtnCart = ({ id }: { id: string }) => {

const [loading, setLoading] = useState(false);
const { addProductToCart } = useContext(cartContext) 

  async function handleAddToCart() {
	   setLoading(true);
	   try{
   const data  = await addProductToCart(id);
   console.log(data);
   
//gwa al data bit3rd success
if(data.status === "success"){
	toast.success("Product added to cart successfully!", {
                    duration: 2000,
                    position: "top-center",
         icon: <CheckCircle className="text-green-500" />,
});
} else {
	toast.error("Failed to add product to cart.", {
					duration: 2000,
					position: "top-center",
		 icon: <CheckCircle className="text-red-500" />,
	});
}
  }catch(error){

   toast.error("Something went wrong!", {
      duration: 2000,
      position: "top-center",
      icon: <CheckCircle className="text-red-500" />,
    });
  } finally {
    setLoading(false); 
  }
}
  return (
    <div className='flex justify-center mt-4 w-[100%]'>
      <Button
  className="w-[80%] bg-green-500 flex items-center justify-center gap-2"
  variant="default"
  onClick={handleAddToCart}
  disabled={loading}
>
  {loading ? (
    <>
      <i className="fa-solid fa-spinner fa-spin"></i> Adding...
    </>
  ) : (
    "+ Add"
  )}
</Button>

    </div>
	
  );
};

export default AddBtnCart;