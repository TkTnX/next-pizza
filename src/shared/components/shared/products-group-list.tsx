"use client";
import * as React from "react";
import { Title } from "./title";
import ProductCard from "./productCard";
import { cn } from "@/shared/lib/utils";
import { useIntersection } from "react-use";
import { useCategories } from "@/shared/store/category";
interface IProductsGroupListProps {
  className?: string;
  title: string;
  products: any[];
  listClassName?: string;
  categoryId: number;
}

const ProductsGroupList: React.FunctionComponent<IProductsGroupListProps> = ({
  className,
  title,
  products,
  listClassName,
  categoryId,
}) => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });
  const setActiveCategory = useCategories((state) => state.setCategoryActive);

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategory(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategory, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            price={
              item.variants && item.variants.length > 0
                ? item.variants[0].price
                : null
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
