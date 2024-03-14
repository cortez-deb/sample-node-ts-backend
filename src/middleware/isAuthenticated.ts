import { Request,Response,NextFunction } from "express";
import consula from "consola";


const isAutheticated = (req: Request, res: Response, next: NextFunction) => {
    if(!Object.keys(res.locals.user || {}).length){
        consula.error("Not authorized to access this resource")
        return res.sendStatus(403);
    }

    return next();
}

export default isAutheticated;