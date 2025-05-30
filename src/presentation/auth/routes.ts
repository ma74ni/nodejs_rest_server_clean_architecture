import { Router } from "express";

export class AuthRoutes {
    //si se va hacer inyección de dependencias, hacerlo con el constructor
    //si no se va hacer inyección de dependencias hacerlo así
    static get routes(): Router {
        const router = Router();

        router.post('/login', (req, res)=> {
            res.json('Login')
        })
        router.post('/register', (req, res) => {
            res.json('Register')
        })

        return router;
    }
}