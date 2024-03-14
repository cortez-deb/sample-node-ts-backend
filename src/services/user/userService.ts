import { UserInterface } from "../../types/User";
import User from "../../models/User"

export default class UserService {
    static async create({user}: {user: UserInterface}){
        const _user = await User.create(user);
        return _user;
    }

    static async signin({email}: {email: string}){
        const user = await User.findOne({ email}).select("+password");
        return user;
    }
}

// module.exports = {UserService};