import { Express } from "express";
import Authentication from "../controllers/User/index";
import validate from "../middleware/validateResource";
import { UserSchema } from "../schema/User.schema";
const route = (app: Express) => {
    const api = '/api/v1/authentication'
    app.post(`${api}/register`,validate(UserSchema.createOrderSchema), Authentication.register);
    app.post(`${api}/signin`,validate(UserSchema.signInSchema), Authentication.signin);
}


export default route;