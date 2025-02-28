import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {  
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [25, "Can't exceed 25 characters"],
        },
        surname: {
            type: String,
            required: [true, "Surname is required"],
            maxLength: [25, "Can't exceed 25 characters"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true, 
            maxLength: [15, "Can't exceed 15 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, // Se asegura de que no se repitan emails
            lowercase: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters"],
            maxLength: [100, "Can't exceed 100 characters"],
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            enum: ["ADMIN"], // Solo existe el rol ADMIN
            uppercase: true,
            default: "ADMIN",
        },
        status: {
            type: Boolean,
            default: true
        }
    }
);

// Excluir datos sensibles en la respuesta
userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
};

// Exportar el modelo
export default model("User", userSchema);
