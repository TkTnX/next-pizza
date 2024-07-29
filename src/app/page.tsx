import { Container } from "@/components/shared/container";
import Filters from "@/components/shared/filters";
import { Title } from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";

export default function Home() {
  return <>
  
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold" />
    </Container>


    <TopBar />
    
    <Container className="pb-14 mt-10 flex justify-between">

      {/* Фильтрация */}
      <div className="flex gap-[60px]">
        <Filters className="w-[244px]" />
      </div>

      {/* Список товаров */}
      <div className="flex-1">
        <div className="flex flex-col gap-16">
          Список товаров
        </div>
      </div>
    </Container>

  </>;
}
