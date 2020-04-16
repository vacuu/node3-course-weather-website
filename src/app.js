const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')
// we do see a new color by doing some git seeing?

const app = express()
// for heroku
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.get('/help', (req,res) => {
  res.render('help', {
    title: 'This is the help-section. Most welcome!',
    text: 'You are a handsome coder!',
    name: 'Chris'
  })
})

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
  // render one of our views with express
  res.render('index', {
    title: 'Weather App',
    text: 'Welcome my friend.',
    name: 'Chris'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Chris'
  })
})

app.get('/weather', (req,res) => {
  if(!req.query.address){
    return res.send({
      error: 'No address provided.'
    })
  }
  const address = req.query.address

  geocode(address, (error, {latitude,longitude, location} = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
        error: error
      })
    }
      res.send({
        location: location,
        forecast: forecastData
      })
    })
  })
})


app.get('/products', (req,res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }

  console.log(req.query.search);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404-page',
    name: 'Chris',
    errorMessage: 'Help article not found.'
  })
})

// match anything else that hasnt been
// matched so far *
app.get('*', (req,res) => {
  res.render('404', {
    title: '404-page',
    name: 'Chris',
    errorMessage: 'Page not found.'
  })
})

// app.com (root route) is ''
// app.com/help
// app.com/about
// some
// port 3000 is a developer port
// normally 80 for http

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
