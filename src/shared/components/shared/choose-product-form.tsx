import { cn } from "@/shared/lib/utils";
import * as React from "react";
import ProductImage from "./productImage";
import { Title } from "./title";
import { Button } from "../ui";
import Image from "next/image";

interface IChooseProductFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  onClickAdd?: VoidFunction;
}

const ChooseProductForm: React.FunctionComponent<IChooseProductFormProps> = ({
  className,
  imageUrl,
  name,
  onClickAdd,
}) => {
  const textDetails = "30 см, традиционное тесто 30, 590 г";
  const totalPrice = 590;
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <Image
          src={imageUrl}
          alt={name}
          width={350}
          height={350}
          className="relative left-2 top-2 transition-all z-10 duration-300 "
        />
      </div>

      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChooseProductForm;
