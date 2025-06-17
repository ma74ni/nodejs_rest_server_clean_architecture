import { Request, Response, NextFunction } from "express";

export class AuthMiddleware{

    static validateJWT = (req: Request, res: Response, next: NextFunction): void =>{
        
        console.log('Validando JWT...');
        const authorization = req.header('Authorization');
        
        if(!authorization){
            res.status(401).json({error: 'No token provided'});
            return
        }

        if(!authorization.startsWith('Bearer ')) {
            res.status(401).json({error: 'Invalid Bearer token'});
            return
        }

        const token = authorization.split(' ').at(1) || '';
        console.log('Token:', token);

        try{
            //todo: payload = JwtAdapter
            if (!req.body) {
                req.body = {};
            }
            req.body.token = token

            next(); // Aquí se debería validar el JWT
        } catch(error){
            console.log('Error validating JWT:', error);
            res.status(500).json({error: 'Internal server error'});
        }

    }
}