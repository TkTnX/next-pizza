import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "@/shared/lib/calc-cart-item-total-price";
import { updateCartTotalPrice } from "@/shared/lib/update-cart-total-price";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalPrice: 0, items: [] });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Cart Item not found" });
    }

    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },

      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalPrice(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log(`[CART_PATCH] Server error ${error}`);
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 500 }
    );
  }
}
