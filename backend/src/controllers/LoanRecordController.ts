import { Request, Response } from "express";
import {
  findAllRecords,
  generateRecord,
  modifyRecord,
  queryRecords,
} from "../services/LoanRecordService";
import { LoanRecordDoesNotExistError } from "../utils/libraryErrors";

async function createRecord(req: Request, res: Response) {
  let record = req.body;
  try {
    let createRecord = await generateRecord(record);
    res
      .status(201)
      .json({ message: "New record generated", record: createRecord });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

async function updateRecord(req: Request, res: Response) {
  let record = req.body;
  try {
    let updateRecord = await modifyRecord(record);
    res
      .status(200)
      .json({ message: " Record updated successfully", record: updateRecord });
  } catch (error) {
    if (error instanceof LoanRecordDoesNotExistError) {
      res
        .status(400)
        .json({ message: "Unable to modify record", error: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
}
async function getAllRecord(req: Request, res: Response) {
  try {
    let record = await findAllRecords();
    res.status(200).json({ message: " Retrived All records", record });
  } catch (error) {
    res
      .status(500)
      .json({ message: "unable to retrive records at this time", error });
  }
}
async function getRecordsByProperty(req: Request, res: Response) {
  let param = req.body;
  try {
    let record = await queryRecords(param);
    res
      .status(200)
      .json({ message: " Retrived  records from your query", record });
  } catch (error) {
    res
      .status(500)
      .json({ message: "unable to retrive records at this time", error });
  }
}

export default {
  createRecord,
  updateRecord,
  getAllRecord,
  getRecordsByProperty,
};
