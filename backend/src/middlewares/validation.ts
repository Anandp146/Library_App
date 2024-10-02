// import { z, ZodError, ZodSchema } from "zod";
// import { NextFunction, Request, Response } from "express";

// export function validateSchema(schema: ZodSchema, property: string) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       switch (property) {
//         case "query":
//           schema.parse(req.query);
//           break;
//         case "params":
//           schema.parse(req.params);
//           break;
//         default:
//           schema.parse(req.body);
//           break;
//       }
//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         return res.status(422).json({
//           message: "Object validation failed, please include a valid object",
//           errors: error.errors, // Provide detailed error information
//         });
//       }
//       next(error);
//     }
//   };
// }

// export const Schemas = {
//   user: {
//     create: z.object({
//       type: z.enum(["ADMIN", "EMPLOYEE", "PATRON"]),
//       firstName: z.string(),
//       lastName: z.string(),
//       email: z.string().regex(/[^@ \t\r\n]+\.[^@ \t\r\n]+/),
//       password: z.string(),
//     }),
//     login: z.object({
//       email: z.string().regex(/[^@ \t\r\n]+\.[^@ \t\r\n]+/),
//       password: z.string(),
//     }),
//     userId: z.object({
//       userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
//     }),
//     update: z.object({
//       _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       type: z.enum(["ADMIN", "EMPLOYEE", "PATRON"]),
//       firstName: z.string(),
//       lastName: z.string(),
//       email: z.string().regex(/[^@ \t\r\n]+\.[^@ \t\r\n]+/),
//       password: z.string(),
//     }),
//   },
//   book: {
//     create: z.object({
//       barcode: z.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/),
//       cover: z.string(),
//       title: z.string(),
//       authors: z.array(z.string()),
//       description: z.string(),
//       subjects: z.array(z.string()),
//       publicationDate: z.preprocess((arg) => {
//         if (typeof arg === "string" || arg instanceof Date)
//           return new Date(arg);
//       }, z.date()),
//       publisher: z.string(),
//       pages: z.number(),
//       genre: z.string(),
//     }),
//     update: z.object({
//       _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       barcode: z.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/),
//       cover: z.string(),
//       title: z.string(),
//       authors: z.array(z.string()),
//       description: z.string(),
//       subjects: z.array(z.string()),
//       publicationDate: z.preprocess((arg) => {
//         if (typeof arg === "string" || arg instanceof Date)
//           return new Date(arg);
//       }, z.date()),
//       publisher: z.string(),
//       pages: z.number(),
//       genre: z.string(),
//     }),
//     delete: z.object({
//       barcode: z.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/),
//     }),
//   },
//   libraryCard: {
//     create: z.object({
//       user: z.string().regex(/^[0-9a-fA-F]{24}$/),
//     }),
//     get: z.object({
//       cardId: z.string().regex(/^[0-9a-fA-F]{24}$/),
//     }),
//   },
//   loan: {
//     create: z.object({
//       status: z.enum(["AVAILABLE", "LOANED"]),
//       loanedDate: z.date(),
//       dueDate: z.date(),
//       returnedDate: z.date().optional(),
//       patron: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       employeeOut: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       employeeIn: z
//         .string()
//         .regex(/^[0-9a-fA-F]{24}$/)
//         .optional(),
//       item: z.string().regex(/^[0-9a-fA-F]{24}$/),
//     }),
//     update: z.object({
//       _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       status: z.enum(["AVAILABLE", "LOANED"]),
//       loanedDate: z.date(),
//       dueDate: z.date(),
//       returnedDate: z.date().optional(),
//       patron: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       employeeOut: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       employeeIn: z
//         .string()
//         .regex(/^[0-9a-fA-F]{24}$/)
//         .optional(),
//       item: z.string().regex(/^[0-9a-fA-F]{24}$/),
//     }),
//     query: z.object({
//       property: z.enum([
//         "_id",
//         "status",
//         "loanedDate",
//         "dueDate",
//         "returnedDate",
//         "patron",
//         "employeeOut",
//         "employeeIn",
//         "item",
//       ]),
//       value: z.union([z.string(), z.date()]),
//     }),
//   },
// };
import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IUser, IUserModel } from "../models/User";
import { IBook, IBookModel } from "../models/Book";
export function validateSchema(schema: ObjectSchema, property: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      switch (property) {
        case "query":
          await schema.validateAsync(req.query);
          break;
        case "params":
          await schema.validateAsync(req.params);
          break;
        default:
          await schema.validateAsync(req.body);
      }
      next();
    } catch (error) {
      return res.status(422).json({
        message: "Object Validation failed,please include a valid object",
      });
    }
  };
}

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
        .required(),
      password: Joi.string().required(),
    }),
    login: Joi.object<{ email: string; password: string }>({
      email: Joi.string()
        .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
        .required(),
      password: Joi.string().required(),
    }),
    userId: Joi.object<{ userId: string }>({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object<IUserModel>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
        .required(),
      password: Joi.string(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      barcode: Joi.string()
        .pattern(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
        .required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
    }),
    update: Joi.object<IBookModel>({
      _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      barcode: Joi.string()
        .pattern(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
        .required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
    }),

    // update: Joi.object<IBookModel>({
    //   _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    //   barcode: Joi.string()
    //     .regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
    //     .required(),
    //   cover: Joi.string().required(),
    //   title: Joi.string().required(),
    //   authors: Joi.array().required(),
    //   description: Joi.string().required(),
    //   subjects: Joi.array().required(),
    //   publicationDate: Joi.date().required(),
    //   publisher: Joi.string().required(),
    //   pages: Joi.number().required(),
    //   genre: Joi.string().required(),
    // }),
    delete: Joi.object<{ barcode: string }>({
      barcode: Joi.string()
        .regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
        .required(),
    }),
  },
  libraryCard: {
    create: Joi.object({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    get: Joi.object({
      cardId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
  loan: {
    create: Joi.object({
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date().optional(),
      patron: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeOut: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeIn: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
      item: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date().optional(),
      patron: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeOut: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeIn: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional(),
      item: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    query: Joi.object({
      property: Joi.string()
        .valid(
          "_id",
          "status",
          "loanedDate",
          "dueDate",
          "returnedDate",
          "patron",
          "employeeOut",
          "employeeIn",
          "item"
        )
        .required(),
      value: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    }),
  },
};
