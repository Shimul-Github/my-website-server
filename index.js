const express = require("express");
 const helmet = require('helmet');
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// Mongodb details
// Mongodb crud usage examples => Google search
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zd2j777.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollection = client.db("sundarbanKebapDb").collection('menus');
    const reviewCollection = client.db("sundarbanKebapDb").collection('reviews');
    const cartCollection = client.db("sundarbanKebapDb").collection('carts');
    // const movies = database.collection("movies");
    // const reviews = database.collection("reviews");
  
    // To get the data from mongodb server we need to go mongodb crud usage examples site with node.js

    app.get('/menus', async (req,res)=>{
      const result = await menuCollection.find().toArray();
      res.send(result);
    })
    app.get('/reviews', async (req,res)=>{
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })
    // Post FOOD ITEM into CartCollection
    app.post('/carts', async (req,res) =>{
      const cartItem = req.body
      const result = await cartCollection.insertOne(cartItem);
      res.send(result)
    });
    // Get carts collection to show in navbar as per user
    app.get('/carts', async(req,res) =>{
      const result = await cartCollection.find().toArray();
      res.send(result)
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); {eta sobsomoy close kore dite hobe na hole server data show hobe na}
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Sundarban Server is running");
});

app.listen(port, () => {
  console.log(`Sundarbon Server is now running in ${port}`);
});

/*
*add.get('/users)
*add.get('/users/:id)
*add.post('/users)
*add.post('/users)

*/