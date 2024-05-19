export type IProductFilterRequest = {
  searchTerm?: string | undefined;
  productName?: string | undefined;
  color?: string | undefined;
  category?: string | undefined;
};

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   createdAt: Date;
//   updatedAt: Date;
// };

// type UserRole = "ADMIN" | "USER" | "MANAGER" | "SUPER_ADMIN";

type ICategory = {
  id: string;
  categoryName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type IDimensions = {
  id: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  productId: string;
};

type IImage = {
  id: string;
  url: string;
  productId: string;
};

type IReview = {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IProduct = {
  id: string;
  productName: string;
  description: string;
  discount: number;
  price: number;
  categoryId: string;
  stock: number;
  material: string;
  color: string;
  dimensions?: IDimensions | null;
  images?: IImage[];
  category: ICategory;
  reviews?: IReview[];
  createdAt: Date;
  updatedAt: Date;
};

