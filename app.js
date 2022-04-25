// Import express
const express = require('express')

// include Handlebars module
const exphbs = require('express-handlebars')

// Set your app up as an express app
const app = express()

require('./models')

// configure Handlebars
app.engine(
    'hbs',
    exphbs.engine({
        defaultlayout: 'main',
        extname: 'hbs',
        helpers: {
            isIn: (str, array) => array.includes(str),
            isEmpty: array => array.length === 0,
            equals: (str1, str2) => str1 === str2
        }
    })
)

// set Handlebars view engine
app.set('view engine', 'hbs')

// define where static assets live
app.use(express.static('public'))

// Set up to handle POST requests
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: true })) // only needed for URL-encoded input

const aboutRouter = require('./routes/aboutRouter')

app.use('/about', aboutRouter)

const clinicianRouter = require('./routes/clinicianRouter')

app.use('/clinician', clinicianRouter)

const patientRouter = require('./routes/patientRouter')

app.use('/patient', patientRouter)

const loginRouter = require('./routes/loginRouter')

app.use('/login', loginRouter)

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
// app.get('/', (req,res) => {
//     res.send('Our demo app is working!')
// })
app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('*', (req, res) => {
    res.render('notfound')
})

// link to our router
// const peopleRouter = require('./routes/peopleRouter')

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

// the demo routes are added to the end of the '/demo-management' path
// app.use('/people', peopleRouter)

// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('The library app is running!')
})
