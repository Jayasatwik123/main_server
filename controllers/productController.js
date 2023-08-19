import productModel from "../models/productModel.js";
import ApiFeatures from "../utils/apifeatures.js";
import ErrorHandler from "../utils/errorhander.js";
import cloudinary from "cloudinary"

// Create Product -- Admin
export const createProduct =  async (req, res, next) => {


  try {
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
 
    const newproduct=await  productModel.create(req.body);
    res.status(201).json({success:true,
      newproduct,});
  } catch (error) {
// console.log(error);
   res.status(400).json({message:error.message})
  }
 


};

// Get All Product
export const getAllProducts = async (req, res, next) => {
  const resultPerPage = 8;
  const apiFeature = new ApiFeatures(productModel.find(), req.query)
  .search()
  .filter()
  .pagination(resultPerPage);

let products = await apiFeature.query;
let filteredProductsCount = products.length;
const productsCount = await productModel.countDocuments();
res.status(200).json({
  success: true,
  products,
  resultPerPage,
  productsCount,
  filteredProductsCount
});
};

// Get All Product (Admin)
export const getAdminProducts = async (req, res, next) => {
  const products = await productModel.find();

  res.status(200).json({
    success: true,
    products,
  });
};

// Get Product Details
export const getProductDetails = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 
};

// Update Product -- Admin

export const updateProduct = async (req, res, next) => {
  const product= productModel.findById(req.params.id);
  try {

    if(product){
    const updateProduct=await productModel.findByIdAndUpdate(req.params.id,{
      $set:req.body
    },
    {new:true})
    res.status(200).json(updateProduct);
  }else {
    res.status(404).json({message:"Product not found"});
  }

  } catch (error) {
    next(error);
  }
};

// Delete Product

export const deleteProduct = async (req, res, next) => {


  try {

    const product=await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted");

  } catch (error) {
    next(error);
  }
};

// Create New Review or Update the review

export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

// Get All Reviews of a product
export const getProductReviews = async (req, res, next) => {
  const product = await productModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// Delete Review
export const deleteReview = async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
};