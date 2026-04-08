const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  lastName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  email: { type: String, match: /^\S+@\S+\.\S+$/ },
  phone: { type: String, match: /^[0-9]{10}$/ },
  address: { type: String }
});

module.exports = mongoose.model("Contact", contactSchema);
