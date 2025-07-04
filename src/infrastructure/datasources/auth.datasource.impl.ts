import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name, email, password} = registerUserDto

        try{
            //1. Verificar si el correo existe
            const emailExist = await UserModel.findOne({email: email})
            if(emailExist){
                throw CustomError.badRequest('Email already exists') //mensaje de error debe ser genérico
            }

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword( password)
            })
            //2. Hash de constraseñas
            await user.save()

            //3. Mapear la respuesta a nuestra entidad

            //4. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user)    
            
        }catch(error){
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }
    async login(loginUserDto: RegisterUserDto): Promise<UserEntity> {
        const {email, password} = loginUserDto

        try{
            const user = await UserModel.findOne({email: email})
            if(!user){
                throw CustomError.badRequest('Email or password is incorrect')
            }

            const isMatching = this.comparePassword(password, user.password)
            if(!isMatching){
                throw CustomError.badRequest('Email or password is incorrect')

            }

            return UserMapper.userEntityFromObject(user)   

        }catch(error){
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }
}