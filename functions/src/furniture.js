import dbConnect from "./dbConnect.js";

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
    res.send(collection); 
}