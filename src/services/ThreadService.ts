import { Repository } from "typeorm";
import { Threads } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { ThreadSchemaValidate } from "../utils/ThreadSchemaValidate";

export default new (class ThreadService {
  private readonly ThreadRepository: Repository<Threads> = AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findThread = await this.ThreadRepository.find({
        relations: {
          create_by: true,
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
  async delete(req: Request, res: Response) {
    try {
    } catch (error) {}
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
