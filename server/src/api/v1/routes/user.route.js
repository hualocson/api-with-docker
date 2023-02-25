import express from 'express'
import userController from '../controllers/user.controller.js'

const router = express.Router()

// add new user info
router.post('/:accountId', userController.addUser)

// get user
router.get('/:id', userController.getUserById)
// update user
router.put('/:id', userController.updateUser)
// delete user
router.delete('/:id', userController.deleteUser)

export default router
