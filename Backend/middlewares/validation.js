import Joi from "joi"

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const messages = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }))
      return res.status(400).json({ errors: messages })
    }

    req.validatedData = value
    next()
  }
}

// Define schemas
export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid("recruiter", "candidate"),
})

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const createPostSchema = Joi.object({
  content: Joi.string().required().max(5000),
  image: Joi.string().uri().optional(),
})

export const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  jobType: Joi.string().valid("full-time", "part-time", "contract", "freelance"),
  requirements: Joi.array().items(Joi.string()),
  salary: Joi.object({
    min: Joi.number(),
    max: Joi.number(),
    currency: Joi.string(),
  }),
})
