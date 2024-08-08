import { Ingredient } from "@prisma/client";

export interface CartItemProps {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  id: number
  details: string;
  className?: string;
}
