import {Response, NextFunction} from "express";
import {Schema} from "joi";

export async function validate(req: any, res: Response, next: NextFunction, schema: Schema) {
    if(!req.body) return res.sendStatus(400);

    let data = req.body;

    try {
        const options = {
            errors: {
                wrap:
                    {
                        label: ""
                    }
            }
        }
        const verifiedData = await schema.validateAsync(data, options);
        if (!verifiedData) {
            return res.sendStatus(400);
        }
        next();
    }
    catch (e: any) {
        console.log(e);
        return res.status(400).json({
            error: e.details[0].message.charAt(0).toUpperCase() + e.details[0].message.slice(1)
        })
    }
}