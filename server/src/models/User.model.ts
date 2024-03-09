import mongooose from "mongoose"
import bcrypt from "bcryptjs"

export type UserType = {
    firstName : string,
    lastName : string,
    country: string,
    email : string,
    password : string,
}

const userSchema = new mongooose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    country: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = mongooose.model<UserType>("User", userSchema);

export default User;