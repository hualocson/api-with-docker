import responseHandler from '../handlers/response.handler.js'
import accountService from '../services/account.service.js'

// [POST]  '/accounts'
const register = async (req, res) => {
    try {
        const { email, password } = req.body

        const { account } = await accountService.addAccount(email, password)

        responseHandler.created(res, {
            accountId: account.id,
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

        const data = await accountService.login(email, password)

        responseHandler.ok(res, data)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export default {
    register,
    login,
}
