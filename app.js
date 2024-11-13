const express = require("express");
const database = require("./src/db/database");
const sensorRoute = require("./src/routes/route");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors()); // This allows requests from any origin (you can limit this if needed)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/dataSensor", sensorRoute);

database
  .sync({ alter: true })
  .then(() => {
    console.info("database connection");
  })
  .catch((err) => {
    console.error("failed to sync database: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Node.js UTS IOT",
  });
});

app.listen(port, () => console.log(`Server up and running on port ${port}`));
