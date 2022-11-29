const http = require('http');
const express = require('express')
const app = express()

const server = http.createServer((peticion, respuesta) => {
    respuesta.end('Hola mundo')
 })
 
 server.listen(8080, () => {
    console.log("Hello bitch, i'm awake")
 })

