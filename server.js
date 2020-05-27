const express = require('express')
const app = express()

// Port used for local development
const port = 8000

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.use(express.static('www'))

// Start express server
app.listen(port, () => {
  console.log('example app listening on port 8000')
})

// Automatically open browser window to development url
const opn = require('opn')
opn('http://localhost:' + port)