import db from '../api/v1/models/index.js'

const initRole = () => {
    db.Role.bulkCreate([
        {
            id: 1,
            name: 'USER',
        },
        {
            id: 2,
            name: 'ADMIN',
        },
    ])
        .then((roles) => {
            console.log(`Role length ${roles.length}`)
        })
        .catch((err) => {
            console.log(`Error in init Role : ${{ err }}`)
        })
}

initRole()
