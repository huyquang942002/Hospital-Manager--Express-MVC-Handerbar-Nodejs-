const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const hbs = require('hbs')



const lobbyController = require("./controller/lobbyController.js")
const receptionController = require("./controller/receptionController.js")

const lobbyJson = require("./models/lobby.json")
const receptionJson = require("./models/reception.json")
const doctorJson = require("./models/doctor/doctor.json")

const diseases = require("./models/diseases/dataPatient.json")





const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')
const partialsPath = path.join(__dirname, './partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

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
    diseases ,
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


io.on('connection',(socket)=>{
    socket.emit('register-socket',lobbyJson)
})

server.listen(port, () => {
  console.log('Server is up on port ' + port);
})
