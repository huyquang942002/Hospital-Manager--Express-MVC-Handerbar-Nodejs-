const lobbyRouter = require('./lobbyRouter.js')

function route(app) {
    app.use('/lobby', lobbyRouter)

}

module.exports = route