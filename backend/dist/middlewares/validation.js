"use strict";
// import { z, ZodError, ZodSchema } from "zod";
// import { NextFunction, Request, Response } from "express";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = exports.validateSchema = void 0;
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
const joi_1 = __importDefault(require("joi"));
function validateSchema(schema, property) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            switch (property) {
                case "query":
                    yield schema.validateAsync(req.query);
                    break;
                case "params":
                    yield schema.validateAsync(req.params);
                    break;
                default:
                    yield schema.validateAsync(req.body);
            }
            next();
        }
        catch (error) {
            return res.status(422).json({
                message: "Object Validation failed,please include a valid object",
            });
        }
    });
}
exports.validateSchema = validateSchema;
exports.Schemas = {
    user: {
        create: joi_1.default.object({
            type: joi_1.default.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string()
                .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
                .required(),
            password: joi_1.default.string().required(),
        }),
        login: joi_1.default.object({
            email: joi_1.default.string()
                .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
                .required(),
            password: joi_1.default.string().required(),
        }),
        userId: joi_1.default.object({
            userId: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            type: joi_1.default.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string()
                .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
                .required(),
            password: joi_1.default.string(),
        }),
    },
    book: {
        create: joi_1.default.object({
            barcode: joi_1.default.string()
                .pattern(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
                .required(),
            cover: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            authors: joi_1.default.array().required(),
            description: joi_1.default.string().required(),
            subjects: joi_1.default.array().required(),
            publicationDate: joi_1.default.date().required(),
            publisher: joi_1.default.string().required(),
            pages: joi_1.default.number().required(),
            genre: joi_1.default.string().required(),
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
            barcode: joi_1.default.string()
                .pattern(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
                .required(),
            cover: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            authors: joi_1.default.array().required(),
            description: joi_1.default.string().required(),
            subjects: joi_1.default.array().required(),
            publicationDate: joi_1.default.date().required(),
            publisher: joi_1.default.string().required(),
            pages: joi_1.default.number().required(),
            genre: joi_1.default.string().required(),
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
        delete: joi_1.default.object({
            barcode: joi_1.default.string()
                .regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
                .required(),
        }),
    },
    libraryCard: {
        create: joi_1.default.object({
            user: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        }),
        get: joi_1.default.object({
            cardId: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        }),
    },
    loan: {
        create: joi_1.default.object({
            status: joi_1.default.string().valid("AVAILABLE", "LOANED").required(),
            loanedDate: joi_1.default.date().required(),
            dueDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date().optional(),
            patron: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            employeeOut: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            employeeIn: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .optional(),
            item: joi_1.default.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .required(),
            status: joi_1.default.string().valid("AVAILABLE", "LOANED").required(),
            loanedDate: joi_1.default.date().required(),
            dueDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date().optional(),
            patron: joi_1.default.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .required(),
            employeeOut: joi_1.default.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .required(),
            employeeIn: joi_1.default.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .optional(),
            item: joi_1.default.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .required(),
        }),
        query: joi_1.default.object({
            property: joi_1.default.string()
                .valid("_id", "status", "loanedDate", "dueDate", "returnedDate", "patron", "employeeOut", "employeeIn", "item")
                .required(),
            value: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.date()).required(),
        }),
    },
};
