const express = require("express");
const database = require("./src/db/database");
const sensorRoute = require("./src/routes/sensorRoute");
const productRoute = require("./src/routes/productRoute");
const uploadRoute = require("./src/routes/uploadRoute");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors()); // This allows requests from any origin (you can limit this if needed)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/dataSensor", sensorRoute);
app.use("/api/product", productRoute);
app.use("/api/upload", uploadRoute);

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

// Get local IP address dynamically
const os = require("os");
const networkInterfaces = os.networkInterfaces();
const localIP = Object.values(networkInterfaces)
  .flat()
  .find((iface) => iface.family === "IPv4" && !iface.internal)?.address;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server up and running on http://${localIP}:${port}`);
  console.log(`Server also accessible on http://localhost:${port}`);
});
