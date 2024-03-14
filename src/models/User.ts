import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";


const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please provide a valid email "
        ]
    },
    password: {
        type: String,
        required: false,
        minlength: 8,
        select: false
    }
},
    {
        timestamps: true
    });


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash((this.password || ''), salt) ?? '';
    next();
});

UserSchema.methods.matchPasswords = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
    const SECRET: string = process.env.JWT_SECRET_KEY || '';
    const authToken = jsonwebtoken.sign({
        id: this._id,
        first_name: this?.first_name,
        last_name: this?.last_name,
    }, SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const refreshToken = jsonwebtoken.sign({
        id: this._id,
    }, SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    });
    return ({ authToken, refreshToken })
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}



const User = mongoose.model('User', UserSchema);

export default User;