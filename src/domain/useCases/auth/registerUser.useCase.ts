import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface RegisterUserUseCase{
    execute(regiterUserDto: RegisterUserDto): Promise<UserToken>
}

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>


export class RegisterUser implements RegisterUserUseCase {

    constructor(private readonly authRepository: AuthRepository, private readonly signToken: SignToken = JwtAdapter.generateToken) { 
        // Inyección de dependencia del repositorio de autenticación

    }

    async execute(regiterUserDto: RegisterUserDto): Promise<UserToken> {
        //Crear el usuario
        const user = await this.authRepository.register(regiterUserDto);

        //Token
        const token = await this.signToken({ id: user.id }, '2h');
        if(!token) {
            throw CustomError.internalServer('Error generating token');
        }


        return{
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
   
}