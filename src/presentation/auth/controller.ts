import { Request, Response } from "express"
import { AuthRepository, CustomError, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain"
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUser } from "../../domain/useCases/auth/loginUser.useCase";

export class AuthController{

    //se va utilizar inyección de dependencia
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        // aquí guardar en log
        console.error('Unexpected error:', error);
        
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if(error) return res.status(400).json({error})

       new RegisterUser(this.authRepository)
       .execute(registerUserDto!)
       .then(data => res.json(data))
       .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if(error) return res.status(400).json({error})

        new LoginUser(this.authRepository)
        .execute(loginUserDto!)
       .then(data => res.json(data))
       .catch(error => this.handleError(error, res));
    }
    getUsers = (req: Request, res: Response) => {
        UserModel.find()
        .then(users => {
            res.json({
                user: req.body.user
            })
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
    }
}