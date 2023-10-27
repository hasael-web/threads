import { NextFunction, Request, Response } from "express";
import multer from "multer";
import DataURIParser from "datauri/parser";
import path from "path";

export default new (class UploadImageMiddleware {
  upload(fieldName: string) {
    // const storage = multer.diskStorage({
    //   destination: (req, res, cb) => {
    //     cb(null, "src/uploads");
    //   },
    //   filename: (req, file, cb) => {
    //     cb(null, file.fieldname + "." + Date.now() + ".png");
    //   },
    // });
    const storage = multer.memoryStorage();
    const uploadFile = multer({
      storage: storage,
    });

    return uploadFile.single(fieldName);
  }
})();

const dUri = new DataURIParser();
const dataUri = (req: Request) => {
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};

export { dataUri };
// (req, res, function (err: any) {
//     if (err)
//       return res.status(404).json({ message: "file upload failed." });
//     else {
//       next();
//     }
//   });
