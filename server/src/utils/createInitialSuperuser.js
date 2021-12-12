const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const consola = require('consola');
const { INIT_ADMIN_EMAIL, INIT_ADMIN_PASSWORD } = require("../config");

// create initial admin if doesn't exists for testing
module.exports = async () => {
    if (!(await Admin.findOne({isSuperuser: true}).count())) {
        try {
            await Admin.create({
                fullName: "Superuser",
                email: INIT_ADMIN_EMAIL,
                encryptedPassword: bcrypt.hashSync(INIT_ADMIN_PASSWORD, 10),
                isSuperuser: true
            });
            consola.success("Superuser created successfuly");
        }catch(e){
            consola.error("Superuser creation error");
            console.log(e);
        }
    }
}