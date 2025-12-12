"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/_components/ui/card";
import Link from "next/link";
import { product } from "../../types/product.t";
import AddBtnCart from "../AddBtnCart/AddBtnCart";
import WishList from "@/app/_components/whishList/WishList";
import DeleteWishBtn from "@/app/_components/deleteWishBtn/DeleteWishBtn";

const MyCards = ({ product,wish }: { product: product,wish:boolean }) => {


  return (
    <div className="w-full  p-2">
      <div className="inner">
        <Card>
          <Link href={`/proudectDetails/${product.id}`}>
            <CardHeader>
              <Image
                width={300}
                height={200}
                src={product.imageCover
                }
                alt={product.title}
              />
            </CardHeader>
            <CardContent>
              <p className="font-bold text-fuchsia-700">
                {product.category.name}
              </p>
              <p className="line-clamp-1">{product.title}</p>
            </CardContent>
          </Link>

          <CardFooter className="flex flex-col items-center gap-3">
            <div className="flex justify-between w-full">
              <p>{product.price} EGP</p>
              <p>
                {product.ratingsAverage}
                <i className="fa-solid fa-star text-yellow-400"></i>
              </p>
            </div>

            <div className="flex justify-end w-full">
                <WishList id={product.id}/>
            </div>
          </CardFooter>

          <div className=" mt-4 flex flex-col justify-center items-center gap-3">
            <AddBtnCart id={product.id} />
           <DeleteWishBtn id={product.id} wish={wish}/>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyCards;
