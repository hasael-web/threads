import { Repository } from "typeorm";
import { Threads } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  ThreadSchemaValidate,
  UpdateThreadValidate,
} from "../utils/ThreadSchemaValidate";
import { uploader } from "../config/cloudConfig";
import { dataUri, fileBuffer } from "../middlewares/file-upload";
import { Likes } from "../entities/Likes";

export default new (class ThreadService {
  private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);
  private readonly LikesRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findThread = await this.ThreadRepository.find({
        relations: [
          "create_by",
          "like.thread_id",
          "like.user_id",
          "number_of_replies",
        ],
        select: {
          create_by: {
            full_name: true,
            username: true,
            photo_profile: true,
            bio: true,
          },
          like: {
            id: true,
            thread_id: {
              id: true,
            },
            user_id: {
              id: true,
              username: true,
            },
            isLike: true,
          },
        },
        order: { id: "DESC" },
      });

      return res
        .status(200)
        .json({ status: 200, message: "success", data: findThread });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on find thread",
        error,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { content } = req.body;

      let file: any;
      if (req.file) {
        file = dataUri(req).content;
        // file = fileBuffer(req);
        // console.log(file);
      }
      // console.log(file);

      let image: string = "";
      if (req.file || file) {
        const cloud = await uploader.upload(file, {
          use_filename: true,
          folder: "threads",
        });
        image = cloud.secure_url;
      } else {
        image = "";
      }

      const { error } = ThreadSchemaValidate.validate({ content });
      if (error) return res.status(404).json({ status: 404, error });

      const create_by = res.locals.user.id;

      const newThread = await this.ThreadRepository.save({
        content,
        create_by,
        image,
      });
      return res
        .status(200)
        .json({ status: 200, message: "success", data: newThread });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on create thread",
      });
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

      return res
        .status(200)
        .json({ status: 200, message: "success to delete" });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on delete thread service",
      });
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

      return res
        .status(200)
        .json({ status: 200, message: "success to update", data: body });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on update thread",
      });
    }
  }

  // async detail(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const id: number = parseInt(req.params.id, 10);
  //     // const user_id = res.locals.user.id;
  //     const findThread = await this.ThreadRepository.findOne({
  //       where: { id },
  //       // relations: {
  //       //   like: true,
  //       //   number_of_replies: true,
  //       //   create_by: true,
  //       // },
  //       // select: {
  //       //   create_by: {
  //       //     full_name: true,
  //       //     photo_profile: true,
  //       //     username: true,
  //       //     id: true,
  //       //   },
  //       //   number_of_replies:{
  //       //     user_id:true,

  //       //   }
  //       // },
  //       // relations: ["like", "create_by", "number_of_replies.user_id"],
  //       relations: ["create_by", "like.thread_id", "like.user_id", "number_of_replies"],
  //       select: {
  //         number_of_replies: {
  //           content: true,
  //           id: true,
  //           image: true,

  //           user_id: {
  //             id: true,
  //             full_name: true,
  //             photo_profile: true,
  //             username: true,
  //           },
  //         },
  //         create_by: {
  //           email: true,
  //           id: true,
  //           username: true,
  //           photo_profile: true,
  //           full_name: true,
  //         },
  //         like: {
  //           id: true,

  //           user_id: {
  //             id: true,
  //             full_name: true,
  //             photo_profile: true,
  //             username: true,
  //           },
  //           thread_id: {
  //             id: true,
  //           },
  //         },
  //       },
  //     });

  //     if (!findThread) {
  //       return res.status(404).json({ status: 404, message: "id not found" });
  //     }
  //     // console.log("test");

  //     return res.status(200).json({ status: 200, message: "success", data: findThread });
  //   } catch (error) {
  //     return res.status(500).json({
  //       status: 500,
  //       message: "something when wrong on detail thread",
  //       error,
  //     });
  //   }
  // }

  async detail(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id,
        },
        relations: [
          "create_by",
          "number_of_replies",
          "number_of_replies.user_id",
          "like",
          "like.thread_id",
          "like.user_id",
        ],
        select: {
          like: {
            id: true,
            thread_id: {
              id: true,
            },
            user_id: {
              id: true,
            },
            isLike: true,
          },
        },
      });
      return res.status(200).json(thread);
    } catch (error) {
      return res.status(500).json({ Error: "Error While Getting Threads" });
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
