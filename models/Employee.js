const mongoose = require("mongoose");
var Schema = new mongoose.Schema();

var EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, //email id of the employee
  password: String,
});
// Compile model from schema
var EmployeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = EmployeeModel;
