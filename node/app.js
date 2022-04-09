// Import express
const express = require('express')

// include Handlebars module
const exphbs = require('express-handlebars') 

// Set your app up as an express app
const app = express()

// Set up to handle POST requests
app.use(express.json())     // needed if POST data is in JSON format
// app.use(express.urlencoded())  // only needed for URL-encoded input

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
// app.get('/', (req,res) => {
//     res.send('Our demo app is working!')
// })
app.get('/', (req,res) => { 
    res.render('index.hbs')
})

// link to our router
const peopleRouter = require('./routes/peopleRouter')

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req,res,next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

// the demo routes are added to the end of the '/demo-management' path
app.use('/people', peopleRouter)

// define where static assets live
app.use(express.static('public')) 

app.engine('hbs', exphbs.engine({      // configure Handlebars 
    defaultlayout: 'main', 
    extname: 'hbs' 
})) 
 
app.set('view engine', 'hbs')   // set Handlebars view engine

// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(3000, () => {
    console.log('Demo app is listening on port 3000!')
})
