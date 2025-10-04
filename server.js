const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
