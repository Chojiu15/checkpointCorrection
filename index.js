const express = require("express");
const app = express();
const models = require("./models");
const port = 3002;
require("dotenv").config();
const bodyParser = require("body-parser");
const albumRouter = require("./routes/album.route");
const trackRouter = require("./routes/track.route");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/album', albumRouter)
app.use('/track', trackRouter)

models.sequelize.sync().then(() => {
  app.listen(port, console.log(`Server is running on port ${port}`));
});
