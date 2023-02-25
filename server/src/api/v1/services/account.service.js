import db from '../models/index.js'
import userService from './user.service.js'
import bcrypt from 'bcryptjs'

// [POST]  '/accounts'
const addAccount = async (email, password) => {
    // await db.sequelize.sync({ alter: true })

    // Check exist
    const account = await getAccountByEmail(email)
    if (account)
        return Promise.reject({
            status: 400,
            message: 'Email is already exist',
        })

    // Hash
    const hash = await hashPassword(password)

    const newAccount = await db.Account.create({
        email,
        password: hash,
    })

    return Promise.resolve({
        account: newAccount.toJSON(),
    })
}

// [POST] '/accounts/login'
const login = async (email, password) => {
    // await db.sequelize.sync({ alter: true })

    const account = await getAccountByEmail(email)
    if (!account)
        return Promise.reject({
            status: 404,
            message: 'Email is invalid',
        })

    // validPassword
    const validPassword = await bcrypt.compare(password, account.password)
    if (!validPassword)
        return Promise.reject({
            status: 400,
            message: 'Invalid Password',
        })

    return Promise.resolve({ account_id: account.id })
}

const getAccountByEmail = async (email) => {
    // return null if not exist
    return await db.Account.findOne({
        where: {
            email: email,
        },
    })
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
}

export default {
    addAccount,
    login,
}
