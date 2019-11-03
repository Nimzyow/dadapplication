const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

//Connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/clients", require("./routes/clients"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
