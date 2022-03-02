const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('autocar1', 'root', 'y5^T8/%jJkws.g=', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
} catch (err) {
    console.log(`Não foi poss´vel conectar: ${err}`)
}


module.exports = sequelize