require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')

const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)

// Connect to MongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err
  console.log('Connected to MongoDB')
})

// Listen Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
