const formatJoiErrors = require("../../../utils/formatJoiErrors");

// Create a middleware based on joiSchema
module.exports = (joiSchema, reqDataKey = "body") => async (req, res, next) => {
    try {
        const validatedBody = await joiSchema.validateAsync(req[reqDataKey], { abortEarly: false });
        req[reqDataKey] = validatedBody;
        next();
    } catch (err) {
        res.status(400).json({ error: "INPUTS", fieldsErrors: formatJoiErrors(err) });
    }
}