const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

//define paths fro express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

//setup for handelbars
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ezekiel'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About Us',
        name:'Ezekiel'
    })
})
app.get('/help', (req, res)=>{
    res.render('Help',{
        title:'Help Section',
        msg:'This is the help section',
        name:'Ezekiel'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Ezekiel',
        errorMsg:'Help section not found'
    })
})
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide and address'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location}={})=>{
        if (error){
            return res.send({error})
        }
    
        weather(latitude, longitude, (error, weatherdata)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                weather: weatherdata,
                location,
                address:req.query.address
            })
        })    

    })
})
app.get('/products', (req, res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term' 
        })
    }

    //console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name:'Ezekiel',
        errorMsg:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and running in port ' + port)
})