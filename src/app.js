const express = require("express");

const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

let items = [];

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Smart Organizer" });
});

// POST save new item
app.post("/save", (req, res)=>{
    const item = {
        id: Date.now(),
        title: req.body.title,
        link: req.body.link
    }
    items.push(item);
    res.json({sucess: true, item});
});

// GET all items
app.get("/items", (req, res) => {
  res.json(items);
});

// DELETE item
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.json({ success: true });
});

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
});


module.exports = app;
