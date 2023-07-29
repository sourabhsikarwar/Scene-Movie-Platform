const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
let port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({ message: 'server started' })
})

// * movie routes
app.use('/api/movies', require('./routes/movies'))

app.listen(port, () => console.log(`server is running on ${port}`))
