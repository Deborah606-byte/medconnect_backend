const express = require("express");
const mongoose = require("mongoose");
const {api} = require("./routes/index")

const app = express();
app.use(express.json());

// Other middleware and configurations...

app.use("/api",api)


mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("DB connection established");
    app.listen(8000, () => {
      console.log("Server started on port 8000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
