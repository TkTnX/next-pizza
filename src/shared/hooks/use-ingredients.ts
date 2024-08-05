import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

export const useIngredients = () => {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Api.ingredients.getAllIngredients().then(({ data }) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  return { items, isLoading };
};
