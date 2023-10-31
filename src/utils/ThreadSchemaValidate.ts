import * as Joi from "joi";

export const ThreadSchemaValidate = Joi.object({
  content: Joi.string().required(),
});

export const UpdateThreadValidate = Joi.object({
  content: Joi.string(),
  image: Joi.string(),
});
