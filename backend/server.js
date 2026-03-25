const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let items = [];

app.post("/save", (req, res) => {
  const item = {
    id: Date.now(),
    title: req.body.title,
    link: req.body.link,
    type: req.body.type || "generic"
  };
  items.push(item);
  res.json({ success: true, item });
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.json({ success: true });
});

app.listen(3000, ()=>{
    console.log("Server is running on port # 3000");    
});