/**
 * 4 - Secret History Server
 *
 * Lance un serveur sur le port 4002
 *
 * Toutes les 5 secondes le serveur effectue deux requêtes :
 *  - Une sur le serveur port 4000
 *  - Une sur le serveur port 4001
 */

const express = require('express')
const fetch = require('node-fetch')
const app = express()

// Port du serveur
const port = 4002

// Contiendra les 10 dernières requêtes - Plus récente en première
const responseServ = []

setInterval(() => {
    requestServ()
        .then((response) => {
            addInArray(response)
        })
        .catch(e => e)
}, 1000);

/**
 * Execute une requête aux deux serveurs
 *
 * @returns {Promise}
 */
function requestServ() {
    let timeServer = new Promise(((resolve, reject) => {
        fetch('http://localhost:4000')
            .then(r => resolve(r.json()))
            .catch(e => resolve('ERROR'))
    }))

    let secretServer = new Promise(((resolve, reject) => {
        fetch('http://localhost:4001')
            .then(r => resolve(r.json()))
            .catch(e => resolve('ERROR'))
    }))

    return Promise.all([timeServer, secretServer])
}

/**
 * Ajoute un element dans le tableau de requêtes
 *  - Si la longeur du tableau est supérieur ou égal à 10
 *      -> On retire un element a la fin, on ajoute l'element en premier
 *
 * @param element
 */
function addInArray(element) {
    if (responseServ.length >= 10) {
        responseServ.pop()
    }
    console.log(element)
    responseServ.unshift(element)
}

app.get('/:number', function (req, res) {
    let number = req.params.number - 1
    if (number >= 0 && number <= 10 && Number.isInteger(number)) {
        res.json(responseServ[number])
    } else {
        res.status(400)
        res.send('Le numéro doit être supérieur a 1 et inférieur ou egal à 10')
    }
})

app.listen(port, function () {
    console.log(`Le serveur Secret History est lancé sur le port ${port}`)
})