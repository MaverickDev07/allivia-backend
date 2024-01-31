import {User} from "../models/user.model"




const existEmail = async (email = '') => {
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
        throw new Error("El correo " + email + " ya esta registrado")
    }
}

const existUserId = async (id: number) => {
    const IdExist = await User.findByPk(id);
    if (!IdExist) {
        throw new Error("El id " + id + " no fue encontrado")
    }
}

export { existEmail, existUserId };
