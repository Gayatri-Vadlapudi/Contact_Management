const express = require("express");
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get("/", authMiddleware, async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Read by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put("/:id", authMiddleware, async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contact);
});

// Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

// Merge duplicates (by email or phone)
router.post("/merge", authMiddleware, async (req, res) => {
  try {
    // Find duplicates by email
    const emailDuplicates = await Contact.aggregate([
      { $group: { _id: "$email", ids: { $push: "$_id" }, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 }, _id: { $ne: null } } }
    ]);

    // Find duplicates by phone
    const phoneDuplicates = await Contact.aggregate([
      { $group: { _id: "$phone", ids: { $push: "$_id" }, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 }, _id: { $ne: null } } }
    ]);

    let mergedCount = 0;

    // Merge email duplicates
    for (const group of emailDuplicates) {
      const ids = group.ids.sort(); // sort to keep the first (oldest)
      const keepId = ids[0];
      const deleteIds = ids.slice(1);
      await Contact.deleteMany({ _id: { $in: deleteIds } });
      mergedCount += deleteIds.length;
    }

    // Merge phone duplicates (avoid deleting already deleted)
    for (const group of phoneDuplicates) {
      const ids = group.ids.sort();
      const keepId = ids[0];
      const deleteIds = ids.slice(1);
      await Contact.deleteMany({ _id: { $in: deleteIds } });
      mergedCount += deleteIds.length;
    }

    res.json({ message: `Merged ${mergedCount} duplicate contacts` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
