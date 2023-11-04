import * as Joi from "joi";

export const LikeSchemaValidate = Joi.object({
  thread_id: Joi.number().required(),
});
