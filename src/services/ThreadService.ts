import { Repository } from "typeorm";
import { Threads } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { ThreadSchemaValidate, UpdateThreadValidate } from "../utils/ThreadSchemaValidate";

export default new (class ThreadService {
  private readonly ThreadRepository: Repository<Threads> = AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findThread = await this.ThreadRepository.find({
        relations: {
          create_by: true,
          like: true,
        },
        select: {
          create_by: {
            full_name: true,
            username: true,
            photo_profile: true,
          },
        },
      });

      return res.status(200).json({ status: 200, message: "success", data: findThread });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on find thread", error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      const { error } = ThreadSchemaValidate.validate(body);
      if (error) return res.status(404).json({ status: 404, error });

      const newThread = await this.ThreadRepository.save(body);

      return res.status(200).json({ status: 200, message: "success", data: newThread });
    } catch (error) {
      return res
        .status(500)
        .json({ mstatus: 500, essage: "something when wrong on create thread" });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id, 10);

      const findThread = await this.ThreadRepository.findOneBy({ id });

      if (!findThread) {
        return res.status(404).json({ status: 404, message: "id not found" });
      }

      await this.ThreadRepository.remove(findThread);

      return res.status(200).json({ status: 200, message: "success to delete" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on delete thread service" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id, 10);
      const body = req.body;

      const findThread = await this.ThreadRepository.findOneBy({ id });
      if (!findThread) {
        return res.status(404).json({ status: 404, message: "id not found" });
      }

      const { error } = UpdateThreadValidate.validate(body);
      if (error) {
        return res.status(404).json({ status: 404, error });
      }

      if (body.content !== "") {
        findThread.content = body.content;
      }
      if (body.image !== "") {
        findThread.image = body.image;
      }

      this.ThreadRepository.update(findThread, body);
      const update = await this.ThreadRepository.save(findThread);

      return res.status(200).json({ status: 200, message: "success to update", data: body });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on update thread" });
    }
  }
})();

// @Column({ nullable: false })
//   content: string;
//   @Column({ nullable: true })
//   likes: number;
//   @Column({ nullable: true })
//   reply: number;
//   @Column({ nullable: true })
//   isLiked: number;
//   @Column({ nullable: true })
//   posting_image: string;
