import { Request, Response } from "express"

export class AuthController{

    //se va utilizar inyección de dependencia
    constructor() {}

    registerUser = async(req: Request, res: Response) => {
        res.json('registerUser controller')
    }

    loginUser = async(req: Request, res: Response) => {
        res.json('loginUser controller')
    }
}