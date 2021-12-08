module.exports = (joiOneFieldSchema, errorMessage) => ({
    validator: (value) => {
        const validation = joiOneFieldSchema.validate(value);
        return !validation.error;
    },
    message: errorMessage
})