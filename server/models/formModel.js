const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  name: String,
  items: Array
});

var FormModel = mongoose.model("FormModel", formSchema);

module.exports = FormModel;
