import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface IUser {
    user_name: string,
    email: string,
    password: string,
    user_avatar: string,
    isPrivate: boolean,
    isAdmin: boolean,
    comparePassword(password: string): Promise<boolean>,
}

const userSchema = new mongoose.Schema<IUser>({
    user_name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    user_avatar: {
        type: String,
        require: true,
        default: "https://firebasestorage.googleapis.com/v0/b/apexmanga-c7e69.appspot.com/o/user_avatar%2Funknown.png?alt=media"
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

userSchema.pre("save", function(next) {
    if(this.isModified("password")) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword = async function(password: string):Promise<boolean> {
    if(!password) throw new Error("Password does not exists");

    try {
        return await bcrypt.compare(password, this.password);
    } catch(error) {
        return false;
    }
}

const User = mongoose.model<IUser>('User', userSchema);
export default User;