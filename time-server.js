const express = require('express')
const app = express()


const port = 4000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/time-server.html')
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

app.use(
  '/client',
  express.static(__dirname + '/public')
)