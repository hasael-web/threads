import * as cloudinary from "cloudinary";
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

const uploader = cloudinary.v2.uploader;

const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  next();
};
export { cloudinaryConfig, uploader };
