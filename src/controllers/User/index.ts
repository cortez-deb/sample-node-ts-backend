import { Request, Response } from "express";
import crypto from "crypto";
import ResponseService from "../../funcs/responses";
import UserService from "../../services/user/userService";
import TokenService from "../../services/tokenService";
/**
 * @description Authentication provider
 */
class Authenication {
    /**
     * @description Register user account
     * @param req 
     * @param res 
     * @returns 
     */
    async register(req: Request, res: Response) {
        try {
            console.log(UserService.create);
            
            const user = await UserService.create(
                {
                    user: req.body
                }
            )
            return TokenService.sendToken({
                user,
                statusCode: 200,
                res
            })
        } catch (error) {
            ResponseService.error({
                res, error,
            });
        }
    }

    /**
     * @description signin
     * @param req 
     * @param res 
     * @returns 
     */
    async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user: any = await UserService.signin({
                email
            });

            if (!user) {
                return ResponseService.error({ res, error: "Could not find user context." });
            }

            const _isMatch = await user.matchPasswords(password);

            if (!_isMatch) {
                return ResponseService.error({ res, error: "Invalid cridentials." });
            }

            return TokenService.sendToken({
                user,
                statusCode: 200,
                res
            });
        } catch (error) {
            ResponseService.error({
                res, error,
            });
        }
    }


}

export default new Authenication;