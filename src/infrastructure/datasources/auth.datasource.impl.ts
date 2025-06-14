import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource{
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name, email, password} = registerUserDto

        try{
            //1. Verificar si el correo existe
            const emailExist = await UserModel.findOne({email: email})
            if(emailExist){
                throw CustomError.badRequest('Email already exists')
            }

            const user = await UserModel.create({
                name: name,
                email: email,
                password: BcryptAdapter.hash( password)
            })
            //2. Hash de constraseñas
            await user.save()

            //3. Mapear la respuesta a nuestra entidad

            //Todo: Mapear la respuesta a nuestra entidad

            return new UserEntity(
                user.id,
                name,
                email,
                user.password,
                user.roles
            )
        }catch(error){
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }
}