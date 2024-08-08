"use server";

import { revalidatePath } from "next/cache";
import db from "./db";

export const newProduct = async (formData: FormData) => {
  const product = await db.products.create({
    data: {
      content: formData.get("content") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
    },
  });

  revalidatePath("/dashboard/new");
};

export const deleteProduct = async (productId: string) => {
  const product = await db.products.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/dashboard");
};

export const updateProduct = async (
  productId: string,
  data: { [key: string]: any }
) => {
  const product = await db.products.update({
    where: {
      id: productId,
    },
    data,
  });

  revalidatePath("/dashboard");

  return product;
};
