import LoanRecord, {
  ILoanRecord,
  ILoanRecordModel,
} from "../models/LoanRecord";
import { LoanRecordDoesNotExistError } from "../utils/libraryErrors";
import { findBookById, modifyBook } from "./BookService";

export async function generateRecord(
  record: ILoanRecord
): Promise<ILoanRecordModel> {
  try {
    let createdRecord = new LoanRecord(record);
    createdRecord = await createdRecord.save();
    let book = await findBookById(record.item);
    let records = book.records;
    records = [createdRecord, ...records];
    book.records = records;
    await modifyBook(book);
    return createdRecord;
  } catch (error) {
    throw error;
  }
}

export async function modifyRecord(
  record: ILoanRecordModel
): Promise<ILoanRecordModel> {
  try {
    let updatedRecord = await LoanRecord.findOneAndUpdate(
      { _id: record._id },
      record,
      { new: true }
    );
    if (updatedRecord) {
      let book = await findBookById(record.item);
      let records = book.records;
      records[0] = updatedRecord;
      book.records = records;
      await modifyBook(book);
      return updatedRecord;
    }
    throw new LoanRecordDoesNotExistError("The Record does not exist");
  } catch (error) {
    throw error;
  }
}

export async function findAllRecords(): Promise<ILoanRecordModel[]> {
  try {
    return await LoanRecord.find();
  } catch (error) {
    throw error;
  }
}

export async function queryRecords(params: {
  property: string;
  value: string | Date;
}): Promise<ILoanRecordModel[]> {
  try {
    return await LoanRecord.find({ [params.property]: params.value })
      .populate("item")
      .sort("-loanedDate");
  } catch (error) {
    throw error;
  }
}
