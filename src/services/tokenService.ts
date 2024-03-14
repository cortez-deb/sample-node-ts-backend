import User from "../models/User";
import jsonwebtoken from "jsonwebtoken";
import { Response } from "express";
import { UserInterface } from "../types/User";
import ResponseService from "../funcs/responses";
class TokenService {
    /***
    * @Type { function sendToken}
    * @Params { user }
    * @Params { statusCode }
    * @Params { Response res }
    ***/
    sendToken({user, statusCode, res}: {user: any, statusCode: number, res: Response}) {
        const token = user.getSignedToken();
        return ResponseService.success({
            res,
            data: {
                ...(token || {}),
                user
            }
        })
      
    }

    /***
    * @Type { function decode_Token}
    * @Params { token }
    ***/
    decode_token(token: string) {
        if (token) {
            const base64String = token.split('.')[1];
            const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
            return decodedValue;
        }
        return null;
    }

    /***
    * @Type { function processe_refresh_token}
    * @Params { token }
    ***/
    verifyToken(token: string) {
        try {
            const decoded = jsonwebtoken.verify(token, (process.env.JWT_SECRET_KEY ?? ''));
            
            return (
                {
                    valid: true,
                    expired: false,
                    decoded
                }
            )

        } catch (e: any) {

            return (
                {
                    valid: false,
                    expired: e.message === "jwt expired",
                    decoded: null
                }
            )
        }
    }

    /***
    * @Type { function processe_refresh_token}
    * @Params { token }
    ***/
    processe_refresh_token(token : string) {
        if (token) {
            const base64String = token.split('.')[1];
            const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
            return decodedValue;
        }
        return null;
    }


    /***
    * @Type { function search}
    * @Params { token }
    ***/
    async search(key: string) {
        if (!(key?.length)) return null;

        const regex = new RegExp(key, 'i');

        try {
            const user = await User.find({
                $or: [
                    {
                        full_name: { $regex: regex }
                    },
                    {
                        email: { $regex: regex }
                    },
                    {
                        mobile: { $regex: regex }
                    }
                ]
            });
            return user;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export default new TokenService();
