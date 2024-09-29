import mongoose, { Document, Schema } from "mongoose";

export interface ILibraryCard {
  user: string;
}

export interface ILibraryCardModal extends ILibraryCard, Document {}
const LibraryCardSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
});

export default mongoose.model<ILibraryCardModal>(
  "LibraryCard",
  LibraryCardSchema
);
