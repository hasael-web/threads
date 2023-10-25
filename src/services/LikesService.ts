import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { LikeSchemaValidate } from "../utils/LikeSchemaValidate";

export default new (class LikesService {
  private readonly LikesRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findLikes = await this.LikesRepository.find({
        relations: {
          user_id: true,
          thread_id: true,
        },
      });

      return res.status(200).json({ status: 200, message: "success", data: findLikes });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on find likes" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      const { error } = LikeSchemaValidate.validate(body);
      if (error) return res.status(404).json({ status: 404, error });

      this.LikesRepository.create(body);
      const like = this.LikesRepository.save(body);
      return res.status(200).json({ status: 200, message: "success", data: like });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on create Like" });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id, 10);

      const findToDelete = await this.LikesRepository.findOneBy({ id });

      await this.LikesRepository.remove(findToDelete);

      return res.status(200).json({ status: 200, message: "success to delete " });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on delete like" });
    }
  }
})();
