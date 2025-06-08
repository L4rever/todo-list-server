import jwt from "jsonwebtoken"
import UserDTO from "../types/userDTO";

const generateTokens = (user: any) => {
    const accessSecret = process.env.ACCESS_SECRET!;
    const refreshSecret = process.env.REFRESH_SECRET!;

    const accessToken = jwt.sign({id: user.id}, accessSecret, {expiresIn: "1h"});
    const refreshToken = jwt.sign({id: user.id}, refreshSecret, {expiresIn: "1d"});
    return {accessToken, refreshToken}
}

export default generateTokens;