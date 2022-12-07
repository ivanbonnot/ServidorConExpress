const express = require('express');
const app = express();
const Contenedor = require('./contenedor.js');
const productos = new Contenedor('productos.txt')

app.get('/', (_, response) => {
    response.send(`<h1>Hello world</h1>`)
})

app.get('/productos', (_, response) => {
    response.send(allTheProducts());
});

app.get('/productosRandom', (_, response) => {
    response.send(productById());
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening in port ${PORT}`))






const allTheProducts = async () => {
    try {

        let array = await productos.getAll()
        console.log("-----Traer todos los productos-----")
        console.log(array)

    } catch (err) {
        console.log(err)
    }
}

const productById = async () => {
    try {
        let array = await productos.getAll()
        const id = Math.floor(Math.random() * (array.length) + 1)
        let idProd = await productos.getById(id)
        console.log(`-----Traer el producto con id = ${id}-----`)
        console.log(idProd)

    } catch (err) {
        console.log(err)
    }
}


