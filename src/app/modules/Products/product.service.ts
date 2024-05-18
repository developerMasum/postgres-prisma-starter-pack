import { Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IUser } from "../User/user.interface";
import { IProduct, IProductFilterRequest } from "./product.interface";
import { productSearchableFields } from "./product.constants";

const createProduct = async (payload: any) => {
  console.log(payload);

  const result = await prisma.$transaction(async (tx) => {
    const {
      ProductName,
      description,
      discount,
      price,
      categoryId,
      stock,
      material,
      color,
      dimensions,
      images,
    } = payload;

    // Create the product
    const createdProduct = await tx.product.create({
      data: {
        ProductName,
        description,
        discount,
        price,
        categoryId,
        stock,
        material,
        color,
        
      },
    });

    // Create the dimensions for the product
    const createdDimensions = await tx.dimensions.create({
      data: {
        length: dimensions.length,
        width: dimensions.width,
        height: dimensions.height,
        weight: dimensions.weight,
        productId: createdProduct.id,
      },
    });

    // Create the image gallery for the product
    const createdImages = await Promise.all(
      images.map((image: any) =>
        tx.image.create({
          data: {
            url: image.url,
            altText: image.altText,
            productId: createdProduct.id,
          },
        })
      )
    );

    return {
      product: createdProduct,
      dimensions: createdDimensions,
      images: createdImages,
    };
  });

  return result;
};


// const getAllProducts = async () => {
//   const products = await prisma.product.findMany({
//     include: {
//       category: true,
//       dimensions: true,
//       images: true,
//       reviews: {
//         include: {
//           user: true,
//         },
//       },
//     },
//   });

//   return products;
// };

const getAllProducts = async (
  filters: IProductFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
          select: {
      id: true,
      ProductName : true,
      price : true,
      color : true,
      discount : true,
      stock : true,
      description : true,
      material : true,
      category : true,
      categoryId : true,
      dimensions : true,
      images : true,
      reviews : true,
      createdAt : true,
      updatedAt : true}
  })
  const total = await prisma.product.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleProduct = async(id:string)=>{
 const result = await prisma.product.findUniqueOrThrow({
  where:{
    id
  },include:{
    dimensions: true,
    category:true,
    images:  true
  }
 })
 return result;
}


export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
