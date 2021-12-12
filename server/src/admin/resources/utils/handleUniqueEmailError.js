const { UNIQUE_EMAIL_ERROR_MSG } = require("../configs/customErrors");

// mongoose unique error is not fully supported by adminBro,
// this module will handle error translation manually 
module.exports = async(errors) => {
    if (errors.email) {
        if (errors.email.type == "duplicate") {
            errors.email.message = UNIQUE_EMAIL_ERROR_MSG
        }
    }
}