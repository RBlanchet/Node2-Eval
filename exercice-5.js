/**
 * 5 - Serveur Fichier Statique - Vue.js
 *
 * Lance un serveur sur le port 4004
 *
 * Retourne un fichier html qui intègrera Vue.js
 */

const express = require('express')
const path    = require("path");

const port = 4004
const app = express()

// Vue.js
app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.listen(port, () => {
    console.log(`Le serveur statique Vue.js écoute sur le port ${port}`)
})