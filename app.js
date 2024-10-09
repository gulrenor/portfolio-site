const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// nodemailer
const nodemailer = require('nodemailer')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// use pug to render html
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/pug'))
app.set('view cache', false)

// set static/public directory for js/css
// app.use('/', express.static('www/static/'))
app.use('/images', express.static(path.join(__dirname, 'build/images')))
app.use('/js', express.static(path.join(__dirname, 'build/js')))
app.use('/css', express.static(path.join(__dirname, 'build/css')))

// routes
app.post('/contact', (req, res) => {
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: CONTACT_HOST,
    port: CONTACT_PORT,
    secure: true,
    auth: {
      user: CONTACT_USER,
      pass: CONTACT_PASS
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: 'twharrison.com', // This is ignored by Gmail
    to: CONTACT_USER,
    subject: 'New message from contact form at twharrison.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('contact-failure') // Show a page indicating failure
    }
    else {
      res.render('contact-success') // Show a page indicating success
    }
  })
})

// render the index view at /
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})