import express from 'express'
import http from 'http'
import * as dotenv from 'dotenv'
import routerV1 from './api/v1/routes/index.js'

dotenv.config()

const port = process.env.SERVER_PORT || 5000
// const port = 5000
const app = express()
// json middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/v1', routerV1)

const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
