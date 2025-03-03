//Lógica de negocio

import User from "./user.model.js"
import { checkPassword, encrypt } from "../../utils/encrypt.js"
import { generateJwt } from "../../utils/jwt.js";

export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN' });
        if (!existingAdmin) {
            const hashedPassword = await encrypt('Default1.');
            const defaultAdmin = new User({
                name: 'admin',
                surname: 'default',
                email: 'admin@gmail.com',
                username: 'admin1',
                password: hashedPassword, 
                role: 'ADMIN'
            });
            await defaultAdmin.save();
            console.log("Default ADMIN user created successfully");
        } else {
            console.log("Default ADMIN user already exists");
        }
    } catch (err) {
        console.error("Error creating default ADMIN user", err);
    }
}


//Login
export const login = async(req, res)=>{
    try{
        //Capturar los datos (body)
        let { username, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username}) //findOne({username}) = ({username: username})
        //Verificar que la contraseña coincida
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = { //No puede ir data sensible
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            //PENDIENTE: generar el Token
            let token = await generateJwt(loggedUser)
            //Responder al usuario
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}