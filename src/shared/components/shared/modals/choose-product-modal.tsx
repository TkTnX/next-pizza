"use client";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import * as React from "react";
import { useRouter } from "next/navigation";
import ChooseProductForm from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import ChoosePizzaForm from "../choose-pizza-form";

interface IChooseProductModalProps {
  product: ProductWithRelations;
}

const ChooseProductModal: React.FunctionComponent<IChooseProductModalProps> = ({
  product,
}) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredient}
            items={product.variants}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
