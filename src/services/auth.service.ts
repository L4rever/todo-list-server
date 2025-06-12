import UserDTO from "../types/userDTO";
import User from "../models/user.model";
import {Errors} from "../types/errors";
import bcrypt from "bcrypt"
import generateTokens from "../utils/generateTokens";

export class AuthService {
    async register(user: UserDTO) {
        const isFound = !!(await User.findOne({where: {login: user.login}}));
        if (isFound) throw new Error(Errors.ALREADY_EXIST);

        const createdUser = await User.create({login: user.login!, password: await bcrypt.hash(user.password!, Number(process.env.SALT!))});
        const {accessToken, refreshToken} = generateTokens(createdUser);
        await User.update({accessToken, refreshToken}, {where: {id: createdUser.id}})

        return {login: createdUser.login, accessToken, refreshToken}
    }

    async login(user: UserDTO) {
        const foundUser = await User.findOne({where: {login: user.login}});
        if (!foundUser) throw new Error(Errors.NOT_EXIST);

        if (!await bcrypt.compare(user.password!, foundUser.password)) {
            throw new Error(Errors.INVALID_CREDENTIALS);
        }

        const {accessToken, refreshToken} = generateTokens(foundUser);
        await User.update({accessToken, refreshToken}, {where: {id: foundUser.id}})
        return {login: foundUser.login, accessToken, refreshToken}
    }
    async refresh(accessToken: string, refreshToken: string, id: number) {
        await User.update({accessToken, refreshToken}, {where: {id}})
    }
}

export default new AuthService();