import express from "express"

import { newOrder,getSingleOrder,myOrders,getAllOrders,updateOrder,deleteOrder } from "../controllers/orderController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewarre/auth.js";
const order = express();


order.post("/order/new" ,isAuthenticatedUser,newOrder);

order.get("/order/:id",isAuthenticatedUser, getSingleOrder);

order.get("/orders/me",isAuthenticatedUser, myOrders);

order.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"), getAllOrders);

order.put("/admin/order/:id", isAuthenticatedUser, authorizeRoles("admin"),updateOrder)
  order.delete("/admin/order/:id",isAuthenticatedUser, authorizeRoles("admin"),deleteOrder);

export default order;