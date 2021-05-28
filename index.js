import express, { json } from 'express'
import fs from 'fs'

const app = express()
const PORT = 8080

let visitsItems = 0
let visitsRandom = 0

const randomNumber = (min, max) => {
    return Math.round(Math.random() *((max) - min) + min)
}

app.get('/', (req, res) => {
    res.send('<h1>Home</h1>')
})

app.get('/items', (req, res) => {
    visitsItems++
    try {
        const read = fs.readFileSync('./productos.txt', 'utf-8')
        const products = JSON.parse(read)
        const response = JSON.stringify({
            items: products,
            quantity: products.length
        }, null, 4)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send('No se encontraron productos')
    }
})

app.get('/item-random', (req, res) => {
    visitsRandom++
    try {
        const read = fs.readFileSync('./productos.txt', 'utf-8')
        const products = JSON.parse(read)
        const num = randomNumber(0, products.length -1)
        const response = JSON.stringify({
            item: products[num]
        })
        res.send(response)
    } catch (error) {
        console.log (error)
        res.send('No se encontraron productos')
    }
})

app.get('/visitas', (req, res) => {
    const response = JSON.stringify({
        visits: {
            items: visitsItems,
            item: visitsRandom
        }
    }, null, 4)
    res.send(response)
})

const server = app.listen(PORT, () => {
    console.log('Server escuchando en puerto ' + PORT )
})

server.on('error', error => {
    console.log('Error al iniciar: ' + error)
})