import { Container } from "@/components/shared/container";
import ProductImage from "@/components/shared/productImage";
import { Title } from "@/components/shared/title";
import VariantsSelector from "@/components/shared/variants-selector";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import * as React from "react";

interface IProductPageProps {
  id: string;
  params: {
    id: string;
  };
}

const ProductPage: React.FunctionComponent<IProductPageProps> = async ({
  params,
}) => {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
  });
  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage
          size={30}
          src={product.imageUrl}
          alt={product.name}
          className=""
        />
        <div className="w-[490px] bg-[#F7F6F5] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>

          <VariantsSelector
            selectedValue="2"
            items={[
              {
                name: "Маленькая",
                value: "1",
              },
              { name: "Средняя", value: "2" },
              { name: "Большая", value: "3" },
            ]}          />
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
