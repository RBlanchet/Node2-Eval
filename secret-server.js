/**
 * @description  Créez un serveur HTTP qui écoutera sur localhost:4001.
    Sur l'URL /secret, le serveur doit renvoyer le mot secret.
    Le mot secret doit être stocké dans le fichier data/secret.txt du projet, mais attention : le contenu de ce fichier doit être encrypter.
 */

const express = require('express')
const app = express()
const fse = require('fs-extra')
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 


function reverseString(str) {
    console.log(str)
    let splitString = str.split("")
    let reverseArray = splitString.reverse()
    let joinArray = reverseArray.join("")
    return joinArray
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/secret', function (req, res) {

    let secretWord = reverseString('secret')

    fse.writeFile("./data/secret.txt", secretWord, function(err) {
        if(err) {
            return console.log(err)
        }

    console.log("The file was saved!")
    })

    res.header("Access-Control-Allow-Origin", "*")
    res.json(secretWord)
  })

app.post('/secretModify', function (req, res) {
    let anotherSecretWord = reverseString(req.body.name)
    console.log(anotherSecretWord)

    fse.writeFile("./data/secret.txt", anotherSecretWord, function(err) {
        if(err) {
            return console.log(err)
        }

    console.log("The new secret was saved!")
    })

    res.header("Access-Control-Allow-Origin", "*")
    res.json(anotherSecretWord)
})
  
app.listen(4001, function () {
  console.log('Example app listening on port 4001!')
})
