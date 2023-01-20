const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { routerContacts } = require("./routes/api/contacts");
const { authRouter } = require("./routes/api/users");
// const { tryCatchWrapper } = require("./helpers/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // tell express to work with JSON in body

// routes
app.use("/api/users", authRouter);
app.use("/api/contacts", routerContacts);

// 404
app.use((req, res) => {
  // res.status(404).json({ message: 'Not found' })
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});
// error handling
app.use((err, req, res, next) => {
  console.error("Handling errors: ", error.message, error.name);

  // handle mongoose validation error
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: error.message,
    });
  }

  // handle ObjectId validation
  if (error.message.includes("Cast to ObjectId failed for value")) {
    return res.status(400).json({
      message: "id is invalid",
    });
  }

  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  console.error("API error :", error.message, error.type);

  return res
    .status(500)
    .json({ status: "Interval server error", code: 500, message: err.message });
});

module.exports = { app };
