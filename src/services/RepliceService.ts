import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Replies } from "../entities/Replies";
import { Request, Response } from "express";
import { RepliceSchemaValidate, RepliceUpdateValidate } from "../utils/RepliceSchemaValidate";

export default new (class RepliesService {
  private readonly RepliceRepository: Repository<Replies> = AppDataSource.getRepository(Replies);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findAll = await this.RepliceRepository.find({
        relations: {
          thread_id: true,
          user_id: true,
        },
        select: {
          user_id: {
            id: true,
            full_name: true,
            username: true,
            photo_profile: true,
          },
          thread_id: {
            id: true,
            image: true,
            content: true,
          },
        },
      });

      return res.status(200).json({ status: 200, message: "success", data: findAll });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on find replice" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      const { error } = RepliceSchemaValidate.validate(body);
      if (error) return res.status(404).json({ status: 404, error });

      const newDate = this.RepliceRepository.create(body);
      console.log(newDate);

      this.RepliceRepository.save(body);
      return res.status(200).json({ status: 200, message: "success", data: newDate });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on create Replice" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const id: number = parseInt(req.params.id, 10);

      const findReplice = await this.RepliceRepository.findOneBy({ id });
      if (!findReplice) return res.status(404).json({ status: 404, message: "id not found" });

      const { error } = RepliceUpdateValidate.validate(body);

      if (error) return res.status(404).json({ status: 404, error });

      if (body.content !== "") {
        findReplice.content = body.content;
      }
      if (body.content !== "") {
        findReplice.image = body.image;
      }
      this.RepliceRepository.update(findReplice, body);
      const update = await this.RepliceRepository.save(findReplice);

      return res.status(200).json({ status: 200, message: "success to update", data: update });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on replice" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id, 10);

      const findReplice = await this.RepliceRepository.findOneBy({ id });

      if (!findReplice) return res.status(404).json({ status: 404, message: "id not found" });

      this.RepliceRepository.remove(findReplice);
      return res.status(200).json({ status: 200, message: "success to delete replice" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on delete replice" });
    }
  }
})();
