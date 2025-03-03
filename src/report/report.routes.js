import { Router } from "express";
import { generateReport, downloadReport } from "./report.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { validateAdminRole } from "../../middlewares/validate.role.js"; 

const api = Router();

api.get("/generate", [validateJwt, validateAdminRole], generateReport);
api.get("/download", [validateJwt], downloadReport);

export default api;
