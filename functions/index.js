import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { getAllFurniture, addNewFurniture, updateNewFurniture } from './src/furniture.js'


const app = express()
app.use(cors())
app.use(express.json())

app.get('/furniture', getAllFurniture)
//app.post('/furniture', addNewFurniture)
app.post('/furniture/:updatefurniture', updateNewFurniture)

export const api = functions.https.onRequest(app)


