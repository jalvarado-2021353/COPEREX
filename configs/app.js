'use strict'

// ECModules | ESModules
import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet'
import cors from 'cors' 
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/user/user.routes.js'
import { createDefaultAdmin } from '../src/user/user.controller.js';
import companyRoutes from '../src/company/company.routes.js'
import reportRoutes from '../src/report/report.routes.js'
import path from 'path'

const configs = (app)=>{
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
const reportsPath = path.join(process.cwd(), "reports");
    app.use("/reports", express.static(reportsPath));
}

const routes = (app)=>{
    app.use(userRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/company', companyRoutes)
    app.use('/v1/reports', reportRoutes)
}


//ESModules no acepta exports.
export const initServer = async()=>{
    const app = express() //Instancia de express
    try{
        await createDefaultAdmin();
        configs(app) //Aplicar configuraciones al servidor
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}