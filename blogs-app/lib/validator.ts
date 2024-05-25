import Joi, { ObjectSchema } from "joi";
import { isValidObjectId } from "mongoose";

export const errorMessage = {
  INVALID_TITLE: "Title is missing!",
  INVALID_TAGS: "Tags must be array of strings!",
  INVALID_SLUG: "Slug is missing!",
  INVALID_META: "Meta description is missing!",
  INVALID_CONTENT: "Post content is missing!",
};

export const postValidationSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    "string.empty": errorMessage.INVALID_TITLE,
    "any.required": errorMessage.INVALID_TITLE,
  }),
  content: Joi.string().required().messages({
    "string.empty": errorMessage.INVALID_CONTENT,
    "any.required": errorMessage.INVALID_CONTENT,
  }),
  slug: Joi.string().required().messages({
    "string.empty": errorMessage.INVALID_SLUG,
    "any.required": errorMessage.INVALID_SLUG,
  }),
  meta: Joi.string().required().messages({
    "string.empty": errorMessage.INVALID_META,
    "any.required": errorMessage.INVALID_META,
  }),
  tags: Joi.array().items(Joi.string()).messages({
    "string.base": errorMessage.INVALID_TAGS,
    "string.empty": errorMessage.INVALID_TAGS,
  }),
});

export const commentValidationSchema = Joi.object().keys({
  belongsTo: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.error("any.invalid");
    }
    return true;
  }).messages({
    "any.invalid": "Post id should be presented as belongsTo!",
    "string.empty": "Invalid belongs to",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is Missing inside comment!"
  }),
})

export const validateSchema = (schema: ObjectSchema, value: any): string => {
  const { error } = schema.validate(value, {
    errors: { label: "key", wrap: { label: false, array: false } },
    allowUnknown: true,
  });

  if (error) {
    return error.details[0].message;
  }

  return "";
};
