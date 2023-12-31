const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(cors());
app.use(express.json());

try {
  mongoose.connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

  app.listen(3001, () => {
    console.log("Server Running");
  });
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.status(401).send("Invalid Password");
        }
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});
