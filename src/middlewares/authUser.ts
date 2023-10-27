import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { isTokenBlacklisted } from "../config/tokenManager";
dotenv.config();

// export interface User extends Request {
//   user: any;
// }

export {};
declare global {
  namespace Express {
    interface Response {
      user?: any;
    }
  }
}

const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    let token: string;

    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      //   console.log(token);
    } else {
      token = req.headers["x-access-token"] || req.cookies["jwt"] || null;
    }
    if (!token) {
      return res.status(403).send("unAuthorization");
    }

    if (isTokenBlacklisted(token)) {
      return res.status(403).send("Invalid token");
    }

    const decoded = verify(token, process.env.JWT_TOKEN_KEY);
    // console.log(decoded);

    res.user = decoded;

    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default authUser;
