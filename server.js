require('dotenv').config();

const fs = require('fs')
const marked = require('marked')
const express = require('express')
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
const app = express()
const port = 8080

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'src/sass'),
    dest: path.join(__dirname, 'www/css'),
    debug: false,
    outputStyle: 'extended',
    prefix: '/css', //if browser requests /static/css/foo/master.css look for file foo/master.css instead of /static/...
    // outputStyle: 'compressed',
    force: true,
  })
);

// for new portals
// app.use('/static', express.static(path.join(__dirname, '/views/public')));

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/src/pug'));


// views/md/*.md
// const mdPath = 'src/md/'

// app.get('/', (req, res) => {
//   const markdowns = fs.readdirSync(mdPath)

//   const output = {}

//   for (const markdownFilename of markdowns) {
//     const content = fs.readFileSync(mdPath + markdownFilename, {
//       encoding: 'UTF-8'
//     })
//     output[markdownFilename] = marked(content)
//   }

//   res.render('index', {
//     jobDescriptions: output
//   })
// })

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('error', err)
  }
  console.log(`server is listening on ${port}`)
})


// // get some info...
// const platform = process.env.NODE_ENV || 'localhost';
// const port = process.env.PORT || 8080;
// // start the server...
// const server = app.listen(port, () => {
//   console.log(`Server started on port ${port} [${platform}]`);
//   console.log(process.env.CAPTCHA_SECRET);
//   server.setTimeout(1000 * 60 * 20);
// });
