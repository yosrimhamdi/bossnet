const formatJoiErrors = require("../utils/formatJoiErrors");

// Create a middleware based on joiSchema
module.exports = (joiSchema, type = "body") => async(req, res, next) => {
    try {
        const validatedBody = await joiSchema.validateAsync(req[type], { abortEarly: false });
        req.body = validatedBody;
        next();
    } catch (err) {
        res.status(400).json({ error: "INPUTS", fieldsErrors: formatJoiErrors(err) });
    }
}