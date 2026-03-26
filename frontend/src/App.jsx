import React, { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [items, setItems] = useState([]);

  // Fetch items from backend
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // Save new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, link })
    });
    const data = await res.json();
    setItems([...items, data.item]);
    setTitle("");
    setLink("");
  };

  // Delete item
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Knowledge Saver</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={e => setLink(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>

      <h2>Saved Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <a href={item.link} target="_blank">{item.title}</a>
            <button onClick={() => handleDelete(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;