// import express from "express";
// import BookController from "../controllers/BookController";
// import { Schemas, validateSchema } from "../middlewares/validation";

// const router = express.Router();

// router.get("/", BookController.getAllBooks);
// router.post(
//   "/",
//   validateSchema(Schemas.book.create, "body"),
//   BookController.createBook
// );
// router.put(
//   "/",
//   validateSchema(Schemas.book.update, "body"),
//   BookController.updateBook
// );
// router.delete(
//   "/:barcode",
//   validateSchema(Schemas.book.delete, "params"),
//   BookController.deleteBook
// );
// router.get("/query", BookController.searchForBooksByQuery);

// export = router;
import express from "express";
import BookController from "../controllers/BookController";
import { Schemas, validateSchema } from "../middlewares/validation";

const router = express.Router();

router.get("/", BookController.getAllBooks);
router.post(
  "/",
  validateSchema(Schemas.book.create, "body"),
  BookController.createBook
);
router.put(
  "/:barcode",
  validateSchema(Schemas.book.update, "body"),
  BookController.updateBook
);

router.delete(
  "/:barcode",
  validateSchema(Schemas.book.delete, "params"),
  BookController.deleteBook
);
router.get("/query", BookController.searchForBooksByQuery);

export = router;
