const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const { seedBooks } = require("./app/seed");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

require("./app/routes/book.router")(app);

const port = Number(process.env.PORT) || 8080;

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE);
    await seedBooks();
    console.log("Mongoose connection open");

    const server = app.listen(port, () => {
      const address = server.address();
      console.log(`App listening at http://localhost:${address.port}`);
    });

    return server;
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exitCode = 1;
    return null;
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
