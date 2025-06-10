import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
    //si se va hacer inyección de dependencias, hacerlo con el constructor
    //si no se va hacer inyección de dependencias hacerlo así
    static get routes(): Router {
        const router = Router();

        const controller = new AuthController()

        router.post('/login', controller.loginUser)
        //router.post('/register', (req, res) => {controller.registerUser(req, res)})
        // es lo mismo pero con javascript se puede obviar.
        router.post('/register', (res, req)=>{controller.registerUser(res, req)})


        return router;
    }
}