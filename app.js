const express = require("express");
const app = express();
const db = require("./data/database");
const quoteRoutes = require("./routes/quote.routes");
app.use(quoteRoutes);
app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something went wrong",
  });
});
db.initDb()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
