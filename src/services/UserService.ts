import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { UserSchemaUpdate, UserSchemaValidate } from "../utils/UserSchemaValidate";
// import { UserSchemaValidate } from "../utils/UserSchemaValidate";

type TUserC = {
  username: string;
  full_name: string;
  photo_profile?: string;
  email: string;
  password: string;
  bio: string;
};

export default new (class UserService {
  private readonly UserRespository: Repository<User> = AppDataSource.getRepository(User);
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const getAll = await this.UserRespository.find({
        relations: {
          follower: true,
        },
      });

      return res.status(200).json({ status: 200, message: "success", data: getAll });
    } catch (error) {
      return res
        .status(500)
        .json({ satatus: 500, message: "something when wrong on find all user ", error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: TUserC = req.body;

      const { error } = UserSchemaValidate.validate(data);
      if (error) return res.status(404).json({ status: 404, error });

      const findUser = await this.UserRespository.find();

      const alredyUser = findUser.map((user) => user.username);

      if (alredyUser.includes(data.username))
        return res.status(404).json({ status: 200, message: "user alredy exits" });

      if (data.photo_profile === "" || data.photo_profile === null) {
        data.photo_profile = "";
      }

      const createUser = this.UserRespository.create({
        full_name: data.full_name,
        username: data.username,
        photo_profile: data.photo_profile,
        email: data.email,
        password: data.password,
        bio: data.bio,
      });

      await this.UserRespository.save(createUser);
      return res.status(200).json({ status: 200, message: "success", data: createUser });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on create user", error });
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
      return res.status(200).json({ status: 200, message: "success", data: new_user });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on update user" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);

      const findUser = await this.UserRespository.findOneBy({ id });

      const deleteuser = await this.UserRespository.remove(findUser);
      return res
        .status(200)
        .json({ status: 200, message: "success to delete data", data: deleteuser });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on delete user", error });
    }
  }
})();
