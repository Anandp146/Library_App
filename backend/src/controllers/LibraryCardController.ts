import { Request, Response } from "express";
import { findLibraryCard, registerLibraryCard } from "../services/LibraryCard";
import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardDoesNotExistError } from "../utils/libraryErrors";

async function getLibraryCard(req: Request, res: Response) {
  const { cardId } = req.params;
  try {
    let libraryCard = await findLibraryCard(cardId);
    res.status(200).json({ message: "Retrieved the user's card", libraryCard });
  } catch (error: any) {
    if (error instanceof LibraryCardDoesNotExistError) {
      res
        .status(404)
        .json({ message: "The specified library card does not exist" });
    } else {
      res.status(500).json({
        message: "Failed to retrieve the library card",
        error: error.message,
      });
    }
  }
}

async function createLibraryCard(req: Request, res: Response) {
  const card: ILibraryCard = req.body;
  try {
    let libraryCard = await registerLibraryCard(card);
    res
      .status(201)
      .json({ message: "Generated library card for user", libraryCard });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to create the library card",
      error: error.message,
    });
  }
}

export default { getLibraryCard, createLibraryCard };
