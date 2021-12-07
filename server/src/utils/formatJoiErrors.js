module.exports = (err) => {
    return err.details.map((fieldErr) => ({
        label: fieldErr.path[0],
        message: fieldErr.message
    }))
}