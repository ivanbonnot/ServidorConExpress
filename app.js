// const http = require('http');
// const express = require('express')
// const app = express()

// const server = http.createServer((peticion, respuesta) => {
//     respuesta.end('Hola mundo')
// })

// server.listen(8080, () => {
//     console.log("Hello bitch, i'm awake")
// })

const express = require('express');
const app = express();

app.get('/', (_, response) => {
    response.send(`<h1>Hello world</h1>`)
})

let counter = 0;
app.get('/visitas', (_, response) => {
    counter++;
    response.send(`Llevamos ${counter} visitas`);
});

app.get('/productos', (_, response) => {
    counter++;
    response.send(allTheProducts());
});


//usar math.random para esto, da un numero entre 0 y menor que uno y a partir de eso calcuylo un numero q me
//devuelva el indice dentro de un arreglo
app.get('/productosRandom', (_, response) => {
    counter++;
    response.send(`Llevamos ${counter} visitas`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening in port ${PORT}`))



const fs = require('fs')

class Contenedor {
  constructor(file) {
    this.file = file
  }

  async save(product) {
    const productos = await this.getAll()
    try {
      let idGen
      productos.length === 0
        ? idGen = 1
        : idGen = productos[productos.length - 1].id + 1

      const prodNuevo = { id: idGen, ...product }
      productos.push(prodNuevo)
      await this.saveFile(this.file, productos)
      return idGen

    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  async saveFile(file, productos) {
    try {
      await fs.promises.writeFile(
        file, JSON.stringify(productos, null, 2)
      )
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  async getById(id) {
    const productos = await this.getAll()
    try {
      const prod = productos.find(item => item.id === id)
      return prod ? prod : null

    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  async getAll() {
    try {
      const productos = await fs.promises.readFile(this.file, 'utf-8')
      return JSON.parse(productos)

    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  async deleteById(id) {
    let productos = await this.getAll()

    try {
      productos = productos.filter(item => item.id != id)
      await this.saveFile(this.file, productos)

    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  async deleteAll() {
    await this.saveFile(this.file, [])
  }

}


const productos = new Contenedor('productos.txt')

const allTheProducts = async () => {
  try {

    let array = await productos.getAll()
    console.log("-----Traer todos los productos-----")
    console.log(array)

  } catch (err) {
    console.log(err)
  }
}

allTheProducts()

