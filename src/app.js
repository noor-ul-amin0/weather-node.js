const express = require("express");
const path = require("path");
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecost')
// init the app
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public"); // setup public directory
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// setup the template engine views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// configure out public files to the static middleware
app.use(express.static(publicDirectoryPath));


// setting routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Noor Arman'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Noor Arman'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Noor Arman'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provide in query strings!'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: data.place,
                address: req.query.address
            })
            console.log('exit')
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Error occured.'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404Error', {
        title: 'Help article not found',
        name: 'Noor Arman'
    })
})

app.get('*', (req, res) => {
    res.render('404Error', {
        title: 'Page not found',
        name: 'Noor Arman'
    })
})
app.listen(3000, () =>
    console.log("Server is running up and listening at port 3000")
);