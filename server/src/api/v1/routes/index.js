import express from 'express'
import userRoute from './user.route.js'
import accountRoute from './account.route.js'

const router = express.Router()

router.use('/accounts', accountRoute)
router.use('/users', userRoute)

router.get('/', (req, res) => {
    res.send('Welcome to my api v1 for e-commerce Mobile app')
})

export default router
