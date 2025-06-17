import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";

export class AuthMiddleware{

    static validateJWT = async(req: Request, res: Response, next: NextFunction) =>{
        
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
            const payload = await JwtAdapter.validateToken(token);
            if(!payload){
                res.status(401).json({error: 'Invalid token'});
                return
            }


            if (!req.body) {
                req.body = {};
            }
            req.body.payload = payload

            next(); // Aquí se debería validar el JWT
        } catch(error){
            console.log('Error validating JWT:', error);
            res.status(500).json({error: 'Internal server error'});
        }

    }
}