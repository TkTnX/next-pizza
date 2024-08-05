import { Ingredient, Product, Variants } from "@prisma/client";

export type ProductWithRelations = Product & { variants: Variants[];  ingredient: Ingredient[]}