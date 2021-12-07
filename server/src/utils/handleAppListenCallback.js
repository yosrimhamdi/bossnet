const consola = require('consola');
const { PORT } = require('../config');
module.exports = (err) => {
    if (err) {
        consola.error("server start error");
        console.log(err);
        return;
    }
    consola.success(`App listening on http://localhost:${PORT}`);
}