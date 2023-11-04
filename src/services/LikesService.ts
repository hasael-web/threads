import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { LikeSchemaValidate } from "../utils/LikeSchemaValidate";
import { Threads } from "../entities/Thread";

interface ILike {
  user_id: number;
  isLike: boolean;
  thread_id: number;
}
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export default new (class LikesService {
  private readonly LikesRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);
  private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findLikes = await this.LikesRepository.find({
        relations: {
          user_id: true,
          thread_id: true,
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
            content: true,
            image: true,
          },
        },
      });
      const user_id = res.locals.user.id;
      const findUserLike = await this.ThreadRepository.findOne({
        where: {
          like: {
            user_id,
          },
        },
      });
      let userLike: boolean = true;
      if (!findUserLike) {
        userLike = false;
      }

      return res
        .status(200)
        .json({ status: 200, message: "success", data: findLikes, userLike });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on find likes" });
    }
  }

  // async create(req: Request, res: Response): Promise<Response> {
  //   try {
  //     // const { content } = req.body;
  //     const { id } = req.query;
  //     console.log(id);

  //     const idThread: number = Number(id);
  //     const user_id = res.locals.user.id;

  //     // console.log(content);

  //     console.log("users", user_id);

  //     const { error } = LikeSchemaValidate.validate({ thread_id: id });
  //     if (error) return res.status(404).json({ status: 404, error });

  //     // const findLikeIsDone = await this.LikesRepository.find({
  //     //   where: {
  //     //     thread_id: {
  //     //       id: idThread,
  //     //     },
  //     //     user_id: {
  //     //       id: user_id,
  //     //     },
  //     //     isLike: true,
  //     //   },
  //     // });

  //     // console.log(findLikeIsDone);
  //     const findLikeIsDone = await this.LikesRepository.find({
  //       where: {
  //         isLike: true,
  //         thread_id: {
  //           id: idThread,
  //         },
  //         user_id: {
  //           id: user_id,
  //         },
  //       },
  //     });

  //     let likes: boolean = true;
  //     const thread_id: any = idThread;

  //     console.log(findLikeIsDone);

  //     if (findLikeIsDone.length > 0) {
  //       this.LikesRepository.remove(findLikeIsDone);
  //       likes = false;
  //       return res.status(200).json({
  //         status: 200,
  //         message: "unlike",
  //         data: { user_id, thread_id, isLike: likes },
  //       });
  //     }

  //     let newLike: any;

  //     if (!findLikeIsDone) {
  //       likes = true;
  //       newLike = this.LikesRepository.create({
  //         isLike: likes,
  //         user_id,
  //         thread_id,
  //       });
  //     }
  //     await this.LikesRepository.save(newLike);

  //     return res.status(200).json({
  //       status: 200,
  //       message: "success",
  //       data: { isLike: likes, user_id, thread_id },
  //     });
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ status: 500, message: "something when wrong on create Like" });
  //   }
  // }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query;
      const thread_id = Number(id);
      const user_id = res.locals.user.id;

      const userIsLike = await this.LikesRepository.findOne({
        where: {
          thread_id: {
            id: thread_id,
          },
          user_id: {
            id: user_id,
          },
          isLike: true,
        },
      });

      let isLike: boolean = true;
      if (userIsLike) {
        await this.LikesRepository.remove(userIsLike);
        isLike = false;
        return res.status(200).json({
          status: 200,
          message: "unlike",
          data: { thread_id, user_id, isLike },
        });
      }

      let Like: any;
      if (!userIsLike) {
        const Thread_Id: any = thread_id;
        Like = this.LikesRepository.create({
          thread_id: Thread_Id,
          user_id,
          isLike,
        });
      }
      this.LikesRepository.save(Like);

      return res.status(200).json({
        status: 200,
        message: "like",
        data: { thread_id, user_id, isLike },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on create Like" });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id, 10);

      const findToDelete = await this.LikesRepository.findOneBy({ id });

      await this.LikesRepository.remove(findToDelete);

      return res
        .status(200)
        .json({ status: 200, message: "success to delete " });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on delete like" });
    }
  }
})();
