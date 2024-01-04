const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to mongo successfully");
    }
  });
};

dotenv.config();

app.use(cors());

const PORT = process.env.PORT || parseInt(process.env.API_PORT);

connectToMongo();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`iNotebook backend listening on port ${PORT}`);
});

module.exports = app;
