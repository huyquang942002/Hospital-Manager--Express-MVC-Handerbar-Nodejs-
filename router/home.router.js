const lobbyRouter = require("./lobby.router.js")

const router = (app) => {
    app.use(lobbyRouter);
  };
  
  module.exports = router;