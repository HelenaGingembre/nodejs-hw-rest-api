const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // tell express to work with JSON in body

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  // res.status(404).json({ message: 'Not found' })
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  console.error("API error :", error.message, error.type);
  // const status = err.status || 500;

  res
    .status(500)
    .json({ status: "Interval server error", code: 500, message: err.message });
});

module.exports = app;
