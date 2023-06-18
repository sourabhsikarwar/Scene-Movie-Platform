const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
let port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// * movie routes
app.use('/api/movies', require('./routes/movies'))

app.listen(port, () => console.log(`server is running on ${port}`))
