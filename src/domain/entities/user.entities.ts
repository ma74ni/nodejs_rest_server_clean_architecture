/*
entidades son similares a lo q se guardará en la base de datos
entidades deben ser desligadas a la base de datos
la data q se espera para mover de un lado a otro son los DTO data transfer objects
*/

export class UserEntity{
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string[],
        public img?: string,
    ){}
}