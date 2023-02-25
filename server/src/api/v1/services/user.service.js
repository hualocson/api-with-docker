import db from '../models/index.js'

const addUser = async (data, accountId) => {
    const { firstName, lastName, phone } = data

    // check account id is assign
    const user = await db.User.findOne({
        where: {
            accountId,
        },
    })
    if (user)
        return Promise.reject({
            status: 400,
            message: 'Account is already assigned',
        })

    const newUser = await db.User.create({
        firstName,
        lastName,
        phone,
        accountId,
    })

    return Promise.resolve({ user: newUser.toJSON() })
}

// [GET] '/users/:id'
const getUserById = async (id) => {
    // user not exist will return null
    const user = await db.User.findByPk(id)
    if (!user)
        return Promise.reject({
            status: 404,
            message: 'User not exist',
        })

    return Promise.resolve({
        user: user.toJSON(),
    })
}

// [PUT] '/users/:id'
const updateUser = async (id, data) => {
    const { firstName, lastName, phone } = data
    const { user } = await getUserById(id)
    await db.User.update(
        {
            firstName,
            lastName,
            phone,
        },
        {
            where: {
                id,
            },
        },
    )

    return Promise.resolve({ message: 'Update success', data: user })
}

// [DELETE] '/users/:id'
const deleteUser = async (id) => {}
export default {
    addUser,
    getUserById,
    updateUser,
    deleteUser,
}
