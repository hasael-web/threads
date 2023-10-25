import { Repository } from "typeorm";
import { Following } from "../entities/Follows";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { FollowingSchemaValidate } from "../utils/FollowingSchemaValidate";

export default new (class FollowingService {
  private readonly FollowingRepository: Repository<Following> =
    AppDataSource.getRepository(Following);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findFollowing = await this.FollowingRepository.find({
        relations: {
          following_id: true,
          follower_id: true,
        },
        select: {
          follower_id: {
            id: true,
            full_name: true,
            username: true,
            photo_profile: true,
          },
          following_id: {
            id: true,
            full_name: true,
            username: true,
            photo_profile: true,
          },
        },
      });
      return res.status(200).json({ status: 200, message: "success", data: findFollowing });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on find following" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error } = FollowingSchemaValidate.validate(body);

      if (error) return res.status(404).json({ status: 404, error });

      if (body.following_id === body.follower_id) {
        return res
          .status(404)
          .json({ status: 404, message: "id following cannot equel to id followers" });
      }

      const following = this.FollowingRepository.create(body);

      await this.FollowingRepository.save(following);
      return res.status(200).json({ status: 200, message: "success", data: following });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on create following" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id, 10);

      const findFollowing = await this.FollowingRepository.findOneBy({ id });

      if (!findFollowing)
        return res.status(404).json({ status: 404, message: "find following not found  " });

      await this.FollowingRepository.remove(findFollowing);
      return res.status(200).json({ status: 200, message: "success to unfollow " });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on delete following" });
    }
  }
})();
