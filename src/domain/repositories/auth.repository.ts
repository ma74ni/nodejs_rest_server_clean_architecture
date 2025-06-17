import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entities";

//es abstract por q no se podrá y no se necesita instanciarla
export abstract class AuthRepository{
    
    //todo:

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
    

    //usamos el tipo RegisterUserDto para q no exista problemas en caso de haber cambios en el DTO
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}