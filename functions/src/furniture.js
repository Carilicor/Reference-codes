import dbConnect from "./dbConnect.js";
import { ObjectId } from "mongodb"

export async function getAllFurniture(req, res) {
    // first connect to database 
    const db = dbConnect()
    // get the whole furniture collection
    const collection = await db.collection("furniture").find().toArray()
        //catch any errors -> status 500
        .catch(err => {
            res.status(500).send(err);
            return;
        })
    // otherwise send back the array of furniture 
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.send(collection);

}

//create
export async function addNewFurniture(req, res) {
    //add new furniture from the body of the request
    const { name, model, id } = req.body
    const newFurniture = { name, model, id }
    //connect to database
    const db = dbConnect()
    //put this new furniture into our furniture collection in our db
    await db.collection('furniture').insertOne(newFurniture)
        //catch errors and send with status 500
        .catch(err => {
            res.status(500).send(err)
            return
        })
    //return a response with 201 all bueno 
    res.status(201).send({ message: 'Furniture added' })
}

export async function updateNewFurniture(req, res) {
    const updateFurniture = { _id: new ObjectId("63515f9f04cf9591f538c6ec") }
    const update = { $set: { name: "Sofa" } }
    const db = dbConnect()
    await db.collection('furniture').findOneAndUpdate(updateFurniture, update)
    .catch(err => {
        res.status(500).send(err)
        return
    })
    res.status(201).send({ message: 'furniture added' })
}

