import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export const updateCartTotalPrice = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartItems: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productItem: {
            include: {
              variants: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalPrice = userCart?.cartItems.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0);

  await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalPrice,
    },
    include: {
      cartItems: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productItem: {
            include: {
              variants: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
};
