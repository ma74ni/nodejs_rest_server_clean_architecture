import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    //si se va hacer inyección de dependencias, hacerlo con el constructor
    //si no se va hacer inyección de dependencias hacerlo así
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImpl()
        const authRepository = new AuthRepositoryImpl(datasource)
        const controller = new AuthController(authRepository)

        router.post('/login', controller.loginUser)
        //router.post('/register', (req, res) => {controller.registerUser(req, res)})
        // es lo mismo pero con javascript se puede obviar.
        router.post('/register', (res, req)=>{controller.registerUser(res, req)})

        router.get('/', AuthMiddleware.validateJWT, controller.getUsers)


        return router;
    }
}