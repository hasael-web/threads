import * as Joi from "joi";

export const RepliceSchemaValidate = Joi.object({
  user_id: Joi.number().required(),
  thread_id: Joi.number().required(),
  image: Joi.string(),
  content: Joi.string(),
});

export const RepliceUpdateValidate = Joi.object({
  image: Joi.string(),
  content: Joi.string(),
});
