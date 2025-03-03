//Validar campos en las rutas
import { body } from "express-validator" 
import { validateErrors } from "./validate.error.js"

export const loginValidator = [
    body('username', 'Username cannot be empty').notEmpty().toLowerCase(),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong').isLength({min: 8}),
    validateErrors
]

export const addCompanyValidator = [
    body("name", "Company name cannot be empty").notEmpty().isLength({ max: 25 }).withMessage("Name cannot exceed 25 characters"),
    body("description", "Description is required").notEmpty().isLength({ max: 100 }).withMessage("Description cannot exceed 100 characters"),
    body("category", "Category is required").notEmpty().isLength({ max: 25 }).withMessage("Category cannot exceed 25 characters"),
    body("impactLevel", "Impact Level is required").notEmpty().isIn(["Alto", "Medio", "Bajo"]).withMessage("Impact Level must be Alto, Medio, or Bajo"),
    body("trajectoryYears", "Years of experience is required and must be a number").notEmpty().isInt({ min: 0 }).withMessage("Years must be a positive number"),
    validateErrors
]

export const updateCompanyValidator = [
    body("description").optional().isLength({ max: 100 }).withMessage("Description cannot exceed 100 characters"),
    body("impactLevel").optional().isIn(["Alto", "Medio", "Bajo"]).withMessage("Impact Level must be Alto, Medio, or Bajo"),
    validateErrors
];

export const filterCompanyValidator = [
    body("category").optional().isLength({ max: 25 }).withMessage("Category cannot exceed 25 characters"),
    body("impactLevel").optional().isIn(["Alto", "Medio", "Bajo"]).withMessage("Impact Level must be Alto, Medio, or Bajo"),
    body("orderBy").optional().isIn(["A-Z", "Z-A", "trajectory"]).withMessage("OrderBy must be A-Z, Z-A, or trajectory"),
    validateErrors
]