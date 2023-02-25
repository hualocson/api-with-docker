import responseHandler from '../handlers/response.handler.js'
import userService from '../services/user.service.js'

// [POST] '/users/:accountId'
const addUser = async (req, res) => {
    const { accountId } = req.params
    const data = req.body
    try {
        const { user } = await userService.addUser(data, accountId)

        responseHandler.created(res, {
            user,
        })
    } catch (error) {
        responseHandler.error(res, error)
    }
}

// [GET] '/users/:id'
const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userService.getUserById(id)
        responseHandler.ok(res, user)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

// [PUT] '/users/:id'
const updateUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const message = await userService.updateUser(id, data)
        responseHandler.ok(res, message)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

// [DELETE] '/users/:id'
const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const rs = await userService.deleteUser(id)
    } catch (error) {
        responseHandler.error(res, error)
    }
}
export default {
    addUser,
    getUserById,
    updateUser,
    deleteUser,
}
