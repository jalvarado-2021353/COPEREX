import { Router } from "express";
import { save, getAll, update, filterCompanies  } from "./company.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { validateAdminRole } from "../../middlewares/validate.role.js"; 

const api = Router();
api.post("/save", [validateJwt, validateAdminRole], save);
api.post("/filter", [validateJwt], filterCompanies);
api.get("/", [validateJwt], getAll);
api.put("/update/:id", [validateJwt, validateAdminRole], update);

export default api;
