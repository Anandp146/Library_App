import LibraryCard, { ILibraryCardModal } from "../models/LibraryCard";

import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardDoesNotExistError } from "../utils/libraryErrors";
export async function registerLibraryCard(
  card: ILibraryCard
): Promise<ILibraryCardModal> {
  try {
    const saved = new LibraryCard(card);
    return await saved.save();
  } catch (error: any) {
    let c = await LibraryCard.findOne({ user: card.user }).populate("user");
    if (c) return c;
    throw error;
  }
}

export async function findLibraryCard(
  libraryCardId: string
): Promise<ILibraryCardModal> {
  try {
    let card = await LibraryCard.findOne({ _id: libraryCardId }).populate(
      "user"
    );
    if (card) return card;
    throw new LibraryCardDoesNotExistError(
      "The Library card specified does not exist"
    );
  } catch (error: any) {
    throw error;
  }
}
