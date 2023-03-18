const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// const methodOverride = require("method-override")


const lobbyController = require("./controller/lobbyController.js")
const receptionController = require("./controller/receptionController.js")
const insuranceController = require("./controller/insuranceController.js")
const move = require("./controller/move.js")

const lobbyJson = require("./models/lobby.json")
const receptionJson = require("./models/reception.json")
const doctorJson = require("./models/doctor.json")

console.log(doctorJson);

const data = require("./models/dataPatient.json")


let patient = []

data.patient.forEach((item)=>{
  patient.push(item)
})



const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

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
    patient ,
    lobbyJson
  })
})


app.get('/reception',(req,res)=>{
  res.render('reception',{
    receptionJson,
    doctorJson
  })  
})


app.use("/",lobbyController)
app.use("/",receptionController)
app.use("/",insuranceController)
app.use("/",move)


io.on('connection',(socket)=>{
    socket.emit('register-socket',lobbyJson)
})

server.listen(port, () => {
  console.log('Server is up on port ' + port);
})
