import {Request, Response, NextFunction, RequestHandler} from "express";
import jwt from "jsonwebtoken";

export default function verifyUserToken(req: any, res: Response, next: NextFunction) {
    const accessSecret = process.env.ACCESS_SECRET!;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token!, accessSecret, (err: any, user: any) => {
        if (err) res.sendStatus(403);
        req.user = user;
        next();
    })
}