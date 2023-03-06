const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()


const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    age: 20,
    name: 'Huy wang'
  })
})

app.get('/doctor',(req,res)=>{
  res.render('doctor',{
    age: 20,
    name: 'Huy wang'
  })
})

app.get('/lobby',(req,res)=>{
  res.render('lobby',{
    age: 20,
    name: 'Huy wang'
  })
})

app.get('/reception',(req,res)=>{
  res.render('reception',{
    age: 20,
    name: 'Huy wang'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})