import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import qs from "qs";

 type PriceProps = {
   priceFrom?: number;
   priceTo?: number;
 };
 interface QFilters extends PriceProps {
   type: string;
   sizes: string;
   ingredients: string;
 }
export const useFilters = () => {
  const router = useRouter();

  const searchParams = useSearchParams() as unknown as Map<
    keyof QFilters,
    string
  >;

  const findSearchParams = (name: any) => {
    return searchParams.get(name)?.split(",");
  };

  // ingredients
  const [selectedIds, { toggle }] = useSet(
    new Set<string>(findSearchParams("ingredients") || [])
  );

  // sizes
  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(findSearchParams("sizes") || [])
  );

  // type
  const [selectedType, { toggle: toggleType }] = useSet(
    new Set<string>(findSearchParams("type") || [])
  );

  // price
  const [price, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  useEffect(() => {
    const filters = {
      ...price,
      type: Array.from(selectedType),
      sizes: Array.from(selectedSizes),
      ingredients: Array.from(selectedIds),
    };

    const query = qs.stringify(filters, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, { scroll: false });
  }, [price, router, selectedIds, selectedSizes, selectedType]);
  const onChangePrices = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    });
  };

  return {
    selectedIds,
    selectedSizes,
    selectedType,
    price,
    setPrice,
    toggle,
    toggleSizes,
    toggleType,
    onChangePrices,
  };
};
