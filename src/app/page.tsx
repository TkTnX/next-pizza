import { Container } from "@/components/shared/container";
import Filters from "@/components/shared/filters";
import ProductsGroupList from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="pb-14 mt-10 flex justify-between gap-16">
        {/* Фильтрация */}
        <div className="flex gap-[60px]">
          <Filters className="w-[244px]" />
        </div>

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList
              title="Пиццы"
              products={[
                {
                  id: 1,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 2,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 3,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 4,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 5,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
              ]}
              categoryId={1}
            />
            <ProductsGroupList
              title="Комбо"
              products={[
                {
                  id: 1,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 2,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 3,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 4,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
                {
                  id: 5,
                  name: "Пицца",
                  price: 500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                  items: [{ price: 500 }],
                },
              ]}
              categoryId={2}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
