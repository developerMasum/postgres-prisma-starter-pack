import express from "express";
import { UserRoutes } from "../app/modules/User/user.route";
import { AuthRoutes } from "../app/modules/Auth/auth.route";
import { CategoryRoutes } from "../app/modules/Category/category.routes";
import { ProductRoutes } from "../app/modules/Products/product.route";
import { ReviewRoutes } from "../app/modules/Review/review.route";



const router = express.Router();

const moduleRoutes = [

  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
