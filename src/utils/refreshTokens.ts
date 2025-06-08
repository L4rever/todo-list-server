import jwt from "jsonwebtoken";
import {Errors} from "../types/errors";
import generateTokens from "./generateTokens";

const refreshTokens = (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, String(process.env.REFRESH_SECRET),
            (err, user: any) => {
            if (err) return reject(Errors.INVALID_REFRESH_TOKEN);
            const newTokens = generateTokens(user)
            resolve({...newTokens, id: user.id});
        })
    })
}

export default refreshTokens;