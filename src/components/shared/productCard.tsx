import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Title } from "./title";
import { Plus } from "lucide-react";
import { Button } from "../ui";

interface IProductCardProps {
  className?: string;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({
  className,
  id,
  name,
  price,
  imageUrl,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image
            width={215}
            height={215}
            className="w-[215px] h-[215px]"
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
          альфредо, чеснок
        </p>

        <div className="flex items-center justify-between">
          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">
              от <b>{price} ₽</b>
            </span>
          </div>
          <Button variant="secondary" className="text-base font-bold">
            <Plus className="w-5 h-5 mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
