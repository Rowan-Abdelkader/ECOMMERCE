"use client";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { cartContext } from "@/Context/CartContext";
import { cashPaymentAction } from "@/PaymentActions/cashPayment";
import { onlinePaymentAction } from "@/PaymentActions/onlinePayment";
import { CheckCircle } from "lucide-react";
import React, { useContext, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const payment = () => {

	const router = useRouter();

  const { cartId  , afterPayment } = useContext(cartContext);
  
  const details = useRef("");
  const phone = useRef("");
  const city = useRef("");

  async function cashPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };
	try{
const data = await cashPaymentAction(cartId, values);
console.log(data);

  if (data.status === "success") {
      toast.success(data.status, {
        duration: 2000,
        position: "top-center",
        icon: <CheckCircle className="text-green-500" />,
      });
    }

	afterPayment();
router.push("/allorders");

 } catch (error) {
    console.log(error);
  }
  }

  async function onlinePayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };
	try{
const data = await onlinePaymentAction(cartId, values);
console.log(data);

if(data.status == "success"){
	window.location.href = data.session.url
}

//   if (data.status === "success") {
//       toast.success(data.status, {
//         duration: 2000,
//         position: "top-center",
//         icon: <CheckCircle className="text-green-500" />,
//       });
//     }

// 	afterPayment();
// 	router.push("allorders");

 } catch (error) {
    console.log(error);
  }
  }

  return (
    <div className="w-full md:w-1/2 my-10 mx-auto px-5 md:px-0">
      <h1 className="text-2xl font-bold mb-4 text-center">Payment</h1>

      <div>
        <label htmlFor="details">Details</label>
        <Input ref={details} type="text" id="details" className=" mb-5" />

        <label htmlFor="phone">Phone</label>
        <Input ref={phone} type="text" id="phone" className=" mb-5" />

        <label htmlFor="city">City</label>
        <Input ref={city} type="text" id="city" className=" mb-5" />

        <Button className="mr-4 mt-5" onClick={cashPayment}>
          Cash Payment
        </Button>
        <Button onClick={onlinePayment}>onlinePayment</Button>
      </div>
    </div>
  );
};

export default payment;
