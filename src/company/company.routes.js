import { Router } from "express";
import { save, getAll, update, filterCompanies  } from "./company.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { validateAdminRole } from "../../middlewares/validate.role.js"; 
import { addCompanyValidator, updateCompanyValidator, filterCompanyValidator } from "../../helpers/validators.js";


const api = Router();
api.post("/save", [validateJwt, validateAdminRole, addCompanyValidator], save);
api.post("/filter", [validateJwt, filterCompanyValidator], filterCompanies);
api.get("/", [validateJwt], getAll);
api.put("/update/:id", [validateJwt, validateAdminRole, updateCompanyValidator], update);

export default api;
