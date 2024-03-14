import { Response } from "express";
import logger from "./logger";
import consola from "consola"; 

export default class ResponseService {
    static success({ res, data }: { res: Response, data: any }) {
        return res.status(200).json({ data });
    }

    static error({ res, error }: { res: Response, error: any }) {
        consola.error(error);
        return res.status(400).json({ error });
    }

    static update({ res, data }: { res: Response, data: any }) {
        return res.status(201).json({ data });
    }
}