//const Autocar = require('../models/Autocar')
const User = require('../models/User')


module.exports = class AutocarController {
    static async showAutocar(req, res) {
        res.render('autocar/home')
    }
}