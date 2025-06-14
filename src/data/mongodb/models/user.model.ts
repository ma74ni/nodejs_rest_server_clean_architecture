import mongoosse, {Schema} from "mongoose"

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    img: { type: String},
    roles:{
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SUPER_ADMIN_ROLE']
    }
})

export const UserModel = mongoosse.model('User', userSchema)