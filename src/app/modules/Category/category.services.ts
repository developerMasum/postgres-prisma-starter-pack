import prisma from "../../../shared/prisma";

import { Request } from "express";

const createCategory = async (payload: any) => {
  console.log(payload)
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};
export const CategoryServices = {
  createCategory,
  getAllCategories,
};
