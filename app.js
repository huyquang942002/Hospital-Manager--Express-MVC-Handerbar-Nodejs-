const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const bodyParser = require('body-parser');
const lobbyController = require("./controller/lobbyController.js")



const data = require("./models/dataSick.json")
// const lobby = require("./models/lobby.json")


let pateint = []

data.patient.forEach((item)=>{
  pateint.push(item)
})



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
  })
})

app.get('/doctor',(req,res)=>{
  res.render('doctor',{
  })
})

app.get('/lobby',(req,res)=>{
  res.render('lobby',{
    pateint : pateint
  })
})

app.get('/reception',(req,res)=>{
  res.render('reception',{

  })
})

app.use("/newPatient",lobbyController)



app.listen(port, () => {
  console.log('Server is up on port ' + port);
})
