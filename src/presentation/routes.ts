import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
    //si se va hacer inyección de dependencias, hacerlo con el constructor
    //si no se va hacer inyección de dependencias hacerlo así, con static
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes)
        
        return router;
    }
}