import { Router } from "express";
import { login } from "./user.controller.js";
import { loginValidator } from "../../helpers/validators.js";

const api = Router();

// Ruta para registrar un administrador (debe estar autenticado)

// Ruta para iniciar sesión
api.post("/login", [loginValidator], login);

export default api;