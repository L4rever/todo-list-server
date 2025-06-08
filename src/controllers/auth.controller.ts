import {Request, Response, NextFunction} from "express";
import UserService from "../services/userService";
import {Errors} from "../types/errors";
import refreshTokens from "../utils/refreshTokens";

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        try {
            user = await UserService.register(user);
            res.status(201).json(user);
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        try {
            user = await UserService.login(user);
            res.status(200).json(user);
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    async refresh(req: any, res: Response, next: NextFunction) {
        const {refreshToken} = req.body;
        if (!refreshToken) res.status(400).json({error: Errors.REFRESH_TOKEN_REQUIRED});

        refreshTokens(refreshToken).then(async (data: any) => {
            await UserService.refresh(data.accessToken!, data.refreshToken!, data.id!)
            return res.status(200).json({accessToken: data.accessToken!, refreshToken: data.refreshToken!})
        });
    }
}

export default new AuthController();