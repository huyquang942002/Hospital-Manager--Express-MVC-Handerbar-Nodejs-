const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const hbs = require("hbs");

const lobbyRouter = require("./src/router/lobbyRouter");
const receptionRouter = require("./src/router/receptionRouter.js");
const doctorRouter = require("./src/router/doctorRouter.js");

const lobbyJson = require("./src/models/lobby.json");
const receptionJson = require("./src/models/reception.json");
const doctorJson = require("./src/models/doctor/doctor.json");
const diseases = require("./src/models/diseases/dataPatient.json");

const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, "./client/views");
const partialsPath = path.join(__dirname, "./client/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/lobby", (req, res) => {
  res.render("lobby", {
    diseases,
    lobbyJson,
  });
});

app.get("/reception", (req, res) => {
  res.render("reception", {
    receptionJson,
    doctorJson,
  });
});

app.use("/", lobbyRouter);
app.use("/", receptionRouter);
app.use("/", doctorRouter);

io.on("connection", (socket) => {
  socket.emit("register-socket", lobbyJson);
});

io.on("connection", (socket) => {
  socket.emit("moveRepception-form", receptionJson);
});

io.on("connection", (socket) => {
  socket.emit("doctor-form", doctorJson);
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
