"use client";
import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import CartDrawerItem from "./cart-drawer-item";
import { getCartItemsDetails } from "@/shared/lib/get-cart-items-details";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
interface ICartDrawerProps {}

const CartDrawer: React.FunctionComponent<
  React.PropsWithChildren<ICartDrawerProps>
> = ({ children }) => {
  const [totalPrice, fetchCartItems, updateItemQuantity, items] = useCartStore(
    (state) => [
      state.totalPrice,
      state.fetchCartItems,
      state.updateItemQuantity,
      state.items,
    ]
  );

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
          {items.map((item) => (
            <div key={item.id} className="mb-2">
              <CartDrawerItem
                id={item.id}
                imageUrl={item.productItem.imageUrl}
                name={item.productItem.name}
                price={item.productItem.variants[0].price}
                quantity={item.quantity}
                details={
                  item.productItem.size && item.productItem.pizzaType
                    ? getCartItemsDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )
                    : ""
                }
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalPrice} ₽</span>
            </div>

            <Link href={"/cart"}>
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
