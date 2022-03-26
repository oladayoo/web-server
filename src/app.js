const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)




// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oladayo Olabiyi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oladayo Olabiyi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'I am here to help you!',
        title: 'Help',
        name: 'Oladayo Olabiyi'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(address, (error, {lat, lon, location} = {}) => {
            if ( error) {
              return console.log(error)
            }
          
            forecast(lat, lon, (error, forecastData) => {
              if (error) {
                return console.log(error)
              }
          
              console.log(location)
              console.log(forecastData)
            })
          })
    }



    res.send({
        forecast: 'It will rain',
        location: 'Philadelphia',
        address: req.query.address
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Oladayo Olabiyi',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        name: 'Oladayo Olabiyi',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})