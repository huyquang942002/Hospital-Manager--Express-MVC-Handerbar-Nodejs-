const path = require('path')
const express = require('express')
const app = express()
const lobbyController = require("./controller/lobbyController.js")

const lobbyJson = require("./models/lobby.json")

const data = require("./models/dataSick.json")


let pateint = []

data.patient.forEach((item)=>{
  pateint.push(item)
})



const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')

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
    pateint ,
    lobbyJson
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
