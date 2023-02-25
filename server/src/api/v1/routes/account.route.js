import express from 'express'
import accountController from '../controllers/account.controller.js'

const router = express.Router()

// login
router.post('/login', accountController.login)
// add new account
router.post('/', accountController.register)

export default router
