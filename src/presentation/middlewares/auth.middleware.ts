import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

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
        

        try{
            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if(!payload){
                res.status(401).json({error: 'Invalid token'});
                return
            }

            const user = await UserModel.findById(payload.id);
            if(!user){
                res.status(401).json({error: 'Invalid token'});//user not found
                return
            }
            // se podría validar el rol del usuario, o si está activo, etc.
            if (!req.body) {
                req.body = {};
            }
            
            req.body.user = user

            next(); // Aquí se debería validar el JWT
        } catch(error){
            console.log('Error validating JWT:', error);
            res.status(500).json({error: 'Internal server error'});
        }

    }
}