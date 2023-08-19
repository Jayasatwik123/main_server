import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import order from "./routes/orderRoute.js";
import product from "./routes/productRoute.js";
import payment from "./routes/paymentRoute.js";
import user from "./routes/userRoute.js";
import error from "./middlewarre/error.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors"
dotenv.config();
const app=express();
app.use(cors());


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(error);





const connect=()=>{
    try {
        mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    } catch (error) {
        console.log(error);
    }
}

cloudinary.config({
    cloud_name: "dsgxtq6ry",
    api_key:"893979765732153",
    api_secret:"aEbf1wYus7vKaFdXYHktTvsNMyo",
  });

app.listen(8800,()=>
{
    connect();

    console.log("connected to backend");
})