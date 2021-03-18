const express = require('express')
const app = express()
const port = 3000

// use pug to render html
app.set('view engine', 'pug')
app.set('views', './src/pug')

// set static/public directory for js/css
app.use(express.static(__dirname + '/www'))

// render the index view at /
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})