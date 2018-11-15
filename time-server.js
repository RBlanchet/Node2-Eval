const express = require('express')

const port = 4000

const app = express()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/time-server.html')
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
