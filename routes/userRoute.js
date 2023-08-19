import express from "express"
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js"
import { authorizeRoles, isAuthenticatedUser } from "../middlewarre/auth.js";



const user= express()

user.post("/register",registerUser);

user.post("/login",loginUser);

user.post("/password/forgot",forgotPassword);

user.put("/password/reset/:token",resetPassword);

user.get("/logout",logout);

user.get("/me", isAuthenticatedUser,getUserDetails);

user.put("/password/update",isAuthenticatedUser, updatePassword);

user.put("/me/update",isAuthenticatedUser, updateProfile);

user.get("/admin/users",isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

user.get("/admin/user/:id",isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
user .put("/admin/user/:id",isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
user .delete( "/admin/user/:id",isAuthenticatedUser, authorizeRoles("admin"),deleteUser);

export default user;