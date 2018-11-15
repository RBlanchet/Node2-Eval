const express = require('express')
const app = express()

const port = 4000

const moment = require('moment')
moment.locale('fr')

var currentTime = moment().format("HH:mm:ss")


app.get('/', (req, res) => {
	if (req.accepts('json')) {
		
		const data =  {time: currentTime}
	  	
	  	res
	    .header({
	      'Content-Type': 'application/json',
	    })
	    .json(data)

	} else if(req.accepts('text/html')) {

	  res.sendFile(__dirname + '/public/time-server.html')
	  
	}
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})


app.use(
  '/client',
  express.static(__dirname + '/public')
)
