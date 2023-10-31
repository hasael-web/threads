import * as Joi from "joi";

export const RepliceSchemaValidate = Joi.object({
  image: Joi.string(),
  content: Joi.string(),
});

export const RepliceUpdateValidate = Joi.object({
  image: Joi.string(),
  content: Joi.string(),
});
