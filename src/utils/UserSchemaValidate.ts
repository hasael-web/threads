import * as Joi from "joi";

export const UserSchemaValidate = Joi.object({
  username: Joi.string().min(5).required(),
  full_name: Joi.string().min(5).required(),

  email: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
  photo_profile: Joi.string().min(5),
  bio: Joi.string(),
});

export const UserSchemaUpdate = Joi.object({
  username: Joi.string().min(5),
  name: Joi.string().min(5),
});

// @Column({ nullable: false })
// username: string;
// @Column({ nullable: false })
// name: string;
// @Column({ nullable: true })
// profile_picture: string;
