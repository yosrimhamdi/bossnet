// copy encryptedPassword field errors to password field errors
module.exports = async(errors) => {
    if (errors.encryptedPassword) {
        errors.password = errors.encryptedPassword;
    }
}