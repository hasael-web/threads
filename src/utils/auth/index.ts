import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default new (class TokenConfig {
  getToken(user: object, expirationTime: number) {
    const token = sign(user, process.env.JWT_TOKEN_KEY, {
      expiresIn: expirationTime,
    });

    return token;
  }
})();

// const getToken = (email,expirationTime)=>{
//   const token =
// }
