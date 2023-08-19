
import ErrorHandler from "../utils/errorhander.js";
import catchasyncErrors from "./catchAsyncErrors.js";
import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const isAuthenticatedUser = catchasyncErrors(async (req, res, next) => {
  /*const { token } = req.cookies;*/
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDIyNzg2MjcyYWMzMWIyY2IxZjdjNyIsImlhdCI6MTY5MjMwMDUzOSwiZXhwIjoxNjkyNzMyNTM5fQ.j6aW6giBnIF1xbw9-zsbGeaUbpFgmyak4H2yQtHOT6o"

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decodedData.id);

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};