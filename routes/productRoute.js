import express from "express"

import { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails,createProductReview,getProductReviews,deleteReview,getAdminProducts } from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewarre/auth.js";

const product = express();

product.get("/products",getAllProducts);

product.get("/admin/products", isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);

product.post("/admin/product/new",isAuthenticatedUser,authorizeRoles("admin"), createProduct);

product.put("/admin/product/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
product.delete("/admin/product/:id",isAuthenticatedUser,authorizeRoles("admin"),  deleteProduct);

product.route("/product/:id").get(getProductDetails);

product.route("/review").put(isAuthenticatedUser,createProductReview);

product.get("/reviews",getProductReviews)
product.delete("/reviews",isAuthenticatedUser, deleteReview);

export default product;