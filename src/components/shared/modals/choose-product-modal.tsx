"use client";
import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import * as React from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import ChooseProductForm from "../choose-product-form";

interface IChooseProductModalProps {
  className?: string;
  product: Product;
}

const ChooseProductModal: React.FunctionComponent<IChooseProductModalProps> = ({
  className,
  product,
}) => {
  const router = useRouter();
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
        <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
