import { z } from "zod";

const CategorySchema = z.object({
  id: z.string({ required_error: "Category ID is required" }),
  categoryName: z.string({ required_error: "Category name is required" }),
  description: z.string({ required_error: "Category description is required" }),
  createdAt: z.date({ required_error: "Category creation date is required" }),
  updatedAt: z.date({ required_error: "Category update date is required" }),
});

const DimensionsSchema = z.object({
  id: z.string({ required_error: "Dimensions ID is required" }),
  length: z.number({ required_error: "Length is required" }),
  width: z.number({ required_error: "Width is required" }),
  height: z.number({ required_error: "Height is required" }),
  weight: z.number({ required_error: "Weight is required" }),
  productId: z.string({
    required_error: "Product ID is required for dimensions",
  }),
});

const ImageSchema = z.object({
  id: z.string({ required_error: "Image ID is required" }),
  url: z
    .string({ required_error: "Image URL is required" })
    .url("Invalid URL format"),
  altText: z.string({ required_error: "Alt text is required" }),
  productId: z.string({ required_error: "Product ID is required for image" }),
});

const ReviewSchema = z.object({
  id: z.string({ required_error: "Review ID is required" }),
  rating: z
    .number({ required_error: "Rating is required" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z.string({ required_error: "Comment is required" }),
  productId: z.string({ required_error: "Product ID is required for review" }),
  userId: z.string({ required_error: "User ID is required" }),
  createdAt: z.date({ required_error: "Review creation date is required" }),
  updatedAt: z.date({ required_error: "Review update date is required" }),
});

const ProductSchema = z.object({
  id: z.string({ required_error: "Product ID is required" }),
  productName: z.string({ required_error: "Product name is required" }),
  description: z.string({ required_error: "Product description is required" }),
  discount: z
    .number({ required_error: "Discount is required" })
    .min(0, "Discount must be at least 0")
    .max(100, "Discount must be at most 100"),
  price: z
    .number({ required_error: "Price is required" })
    .positive("Price must be positive"),
  categoryId: z.string({ required_error: "Category ID is required" }),
  stock: z
    .number({ required_error: "Stock is required" })
    .nonnegative("Stock cannot be negative"),
  material: z.string({ required_error: "Material is required" }),
  color: z.string({ required_error: "Color is required" }),
  dimensions: DimensionsSchema.nullable().optional(),
  images: z.array(ImageSchema).optional(),
  category: CategorySchema,
  reviews: z.array(ReviewSchema).optional(),
  createdAt: z.date({ required_error: "Product creation date is required" }),
  updatedAt: z.date({ required_error: "Product update date is required" }),
});

export const ProductValidation= {
  CategorySchema,
  DimensionsSchema,
  ImageSchema,
  ReviewSchema,
  ProductSchema,
};
