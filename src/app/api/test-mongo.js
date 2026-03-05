const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://User12:User123@projects.vvcvaa2.mongodb.net/innovaite?retryWrites=true&w=majority";

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db("innovaite").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await client.close();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

run();