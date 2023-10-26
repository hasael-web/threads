import * as Joi from "joi";

export const UserSchemaValidate = Joi.object({
  username: Joi.string().min(5).required(),
  full_name: Joi.string().min(5).required(),
  email: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
  bio: Joi.string(),
});

export const UserSchemaUpdate = Joi.object({
  username: Joi.string().min(5),
  name: Joi.string().min(5),
});

export const UserSchemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

// @Column({ nullable: false })
// username: string;
// @Column({ nullable: false })
// name: string;
// @Column({ nullable: true })
// profile_picture: string;
