import { Container } from "@/components/shared/container";
import Filters from "@/components/shared/filters";
import ProductsGroupList from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredient: true,
          variants: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter(category => category.products.length > 0)} />

      <Container className="pb-14 mt-10 flex justify-between gap-16">
        {/* Фильтрация */}
        <div className="flex gap-[60px]">
          <Filters className="w-[244px]" />
        </div>

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    products={category.products}
                    categoryId={category.id}
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
