import express from "express";
import Customer from "../models/Customer.js";
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const c = new Customer(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get("/", async (req, res) => {
  try {
    const items = await Customer.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get("/:id", async (req, res) => {
  try {
    const c = await Customer.findById(req.params.id);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const c = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const c = await Customer.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
