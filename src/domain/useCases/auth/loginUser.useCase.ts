import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
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

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository, 
        private readonly signToken: SignToken = JwtAdapter.generateToken) {
        // Inyección de dependencia del repositorio de autenticación
    }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        // Llamar al repositorio para autenticar al usuario
        const user = await this.authRepository.login(loginUserDto);

        const token = await this.signToken({ id: user.id }, '2h');

        if (!token) {
            throw new Error('Error generating token');
        }

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}