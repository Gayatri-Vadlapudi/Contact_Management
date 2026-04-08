const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Contact = require("./models/Contact");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    
    // Drop unique indexes on email and phone to allow duplicates
    try {
      await Contact.collection.dropIndex("email_1");
      console.log("Dropped unique index on email");
    } catch (err) {
      console.log("Index on email not found or already dropped");
    }
    try {
      await Contact.collection.dropIndex("phone_1");
      console.log("Dropped unique index on phone");
    } catch (err) {
      console.log("Index on phone not found or already dropped");
    }
    
    // Insert dummy user if not exists
    const existingUser = await User.findOne({ username: "dummy" });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("password", 10);
      const user = new User({ username: "dummy", password: hashedPassword, role: "User" });
      await user.save();
      console.log("Dummy user created: username: dummy, password: password");
    }

    // Insert dummy contacts if none exist
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      const dummyContacts = [
        { firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "1234567890", address: "123 Main St" },
        { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phone: "0987654321", address: "456 Elm St" }
      ];
      await Contact.insertMany(dummyContacts);
      console.log("Dummy contacts created");
    }
  })
  .catch(err => console.error(err));

// Routes
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
