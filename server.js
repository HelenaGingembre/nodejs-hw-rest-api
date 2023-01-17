// const express = require("express");
// const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config(); // should be called before you use env variables
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;
const { PORT } = process.env || 3000;

async function connectMongo() {
  try {
    // console.log("HOST_URI", HOST_URI);
    // console.log("PORT", PORT);
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("connectMongo failed:", error.message);
    process.exit(1);
  }
}

connectMongo();

// const Cat = mongoose.model("Cat", { name: String });
