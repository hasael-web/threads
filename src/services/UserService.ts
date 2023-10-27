import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import {
  UserSchemaLogin,
  UserSchemaUpdate,
  UserSchemaValidate,
} from "../utils/UserSchemaValidate";
import * as path from "path";
import { chekPassword, hashPassword } from "../utils/user_bcript";
import TokenConfig from "../utils/auth";
// import { UserSchemaValidate } from "../utils/UserSchemaValidate";

type TUserC = {
  username: string;
  full_name: string;
  photo_profile?: string;
  email: string;
  password: string;
  bio: string;
};

type TUserL = {
  email: string;
  password: string;
};

export default new (class UserService {
  private readonly UserRespository: Repository<User> =
    AppDataSource.getRepository(User);
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const getAll = await this.UserRespository.find({
        relations: {
          follower: true,
        },
      });

      return res
        .status(200)
        .json({ status: 200, message: "success", data: getAll });
    } catch (error) {
      return res.status(500).json({
        satatus: 500,
        message: "something when wrong on find all user ",
        error,
      });
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data: TUserC = req.body;
      const { bio, full_name, email, password, username } = data;
      const { error } = UserSchemaValidate.validate({
        bio,
        full_name,
        email,
        password,
        username,
      });
      if (error) return res.status(404).json({ status: 404, error });
      //
      const findUser = await this.UserRespository.count({
        where: { email: data.email },
      });

      if (findUser > 0)
        return res
          .status(404)
          .json({ status: 404, message: "email alredy exits" });

      const { passwordHash } = hashPassword(data.password, 10);

      const maxAge = 2 * 60 * 60;
      const token = TokenConfig.getToken(data.email, maxAge);

      // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

      // const avatar = path.join(__dirname, "./src/assets", "avatar.jpg");
      let avatar: string =
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";
      const photoProfile =
        data.photo_profile === "" ||
        data.photo_profile === null ||
        data.photo_profile === undefined
          ? avatar
          : data.photo_profile;
      console.log(photoProfile);

      const createUser = this.UserRespository.create({
        full_name: data.full_name,
        username: data.username,
        photo_profile: photoProfile,
        email: data.email,
        password: passwordHash,
        bio: data.bio,
      });

      await this.UserRespository.save(createUser);
      return res
        .status(200)
        .json({ status: 200, message: "success", data: createUser, token });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on create user",
        error,
      });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body: TUserL = req.body;

      const { error } = UserSchemaLogin.validate(body);
      if (error) {
        return res.status(404).json({ status: 404, error });
      }

      const findUser = await this.UserRespository.findOne({
        where: { email: body.email },
      });

      if (!findUser)
        return res
          .status(404)
          .json({ status: 404, message: "email not found" });

      const chekValidasi = chekPassword(body.password, findUser.password);

      if (!chekValidasi) {
        return res.status(404).json({ status: 404, message: "password wrong" });
      }
      const maxAge = 2 * 60 * 60;
      const token = TokenConfig.getToken(body.email, maxAge);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      const user = {
        username: findUser.username,
        full_name: findUser.full_name,
      };

      return res.status(200).json({ status: 200, data: user, token });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on login user" });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      res.cookie("jwt", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 1000),
      });

      return res.status(200).json({ status: 200, message: "succes log out" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on logout user" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const idUser = parseInt(id, 10);

      const findOneUser = await this.UserRespository.findOneBy({ id: idUser });
      if (!findOneUser) {
        return res.status(404).json({ status: 404, message: "id not found" });
      }
      const body: TUserC = req.body;

      const { error } = UserSchemaUpdate.validate(body);
      if (error) return res.status(404).json({ status: 404, error });

      if (body.full_name !== "") {
        findOneUser.full_name = body.full_name;
      }
      if (body.username !== "") {
        findOneUser.username = body.username;
      }
      if (body.photo_profile !== "") {
        findOneUser.photo_profile = body.photo_profile;
      }
      if (body.email !== "") {
        findOneUser.email = body.email;
      }
      if (body.password !== "") {
        findOneUser.password = body.password;
      }
      if (body.bio !== "") {
        findOneUser.bio = body.bio;
      }

      this.UserRespository.update(findOneUser, body);

      const new_user = await this.UserRespository.save(findOneUser);
      return res
        .status(200)
        .json({ status: 200, message: "success", data: new_user });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on update user" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);

      const findUser = await this.UserRespository.findOneBy({ id });

      const deleteuser = await this.UserRespository.remove(findUser);
      return res.status(200).json({
        status: 200,
        message: "success to delete data",
        data: deleteuser,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on delete user",
        error,
      });
    }
  }
})();
