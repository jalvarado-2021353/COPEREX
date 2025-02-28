import { Schema, model } from "mongoose";

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Company name is required"],
            unique: true,
            trim: true,
            maxLength: [100, "Company name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxLength: [500, "Description cannot exceed 500 characters"],
        },
        impactLevel: {
            type: String,
            required: [true, "Impact level is required"],
            enum: ["Bajo", "Medio", "Alto"], // Valores predefinidos
        },
        trajectoryYears: {
            type: Number,
            required: [true, "Years of trajectory are required"],
            min: [0, "Years cannot be negative"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            maxLength: [100, "Category cannot exceed 100 characters"],
        },
        status: {
            type: Boolean,
            default: true, // Permite activar/desactivar una empresa
        }
    }
)

export default model("Company", companySchema);
