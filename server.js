const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "src", "content")));
app.use(express.static(path.join(__dirname, "src")));
app.use("/src", express.static(path.join(__dirname, "src")));
app.use("/content", express.static(path.join(__dirname, "src", "content")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.get("/content/index.json", async (req, res) => {
  try {
    const dir = path.join(__dirname, "src", "content");
    const names = await fs.promises.readdir(dir);
    const files = [];
    for (const name of names.sort()) {
      if (!name.toLowerCase().endsWith(".md")) continue;
      const full = path.join(dir, name);
      const txt = await fs.promises.readFile(full, "utf8");
      const m = txt.match(/^#\s+(.*)/m);
      const title = m ? m[1].trim() : name.replace(/\.md$/i, "");
      files.push({ title, path: "/content/" + name });
    }
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "could not list content" });
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
