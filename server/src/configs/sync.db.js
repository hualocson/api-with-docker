import db from '../api/v1/models/index.js'

const dbSync = () => {
    db.sequelize
        .sync({ alter: true })
        .then(() => {
            console.log('All Database is sync')
        })
        .catch((err) => {
            console.log('Something wrong in sync db' + err)
        })
}

dbSync()
