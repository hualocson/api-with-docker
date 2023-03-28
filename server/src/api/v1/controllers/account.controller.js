import responseHandler from '../handlers/response.handler.js'
import accountService from '../services/account.service.js'
import userService from '../services/user.service.js'

// [POST]  '/accounts'
const register = async (req, res) => {
    try {
        const { email, password, ...data } = req.body

        const { account } = await accountService.addAccount(email, password)
        const { user } = await userService.addUser(data, account.id)

        responseHandler.created(res, {
            user,
        })
    } catch (error) {
        responseHandler.error(res, error)
    }
}
// [POST] '/accounts/login'
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // TODO: validate data

        const accountId = await accountService.login(email, password)

        responseHandler.ok(res, accountId)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export default {
    register,
    login,
}
