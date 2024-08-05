import ChooseProductModal from "@/components/shared/modals/choose-product-modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import React from "react";

const ProductModal = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredient: true,
      variants: true,
    },
  });

  if (!product) {
    return notFound()
  }

  return <ChooseProductModal product={product} />;
};

export default ProductModal;
