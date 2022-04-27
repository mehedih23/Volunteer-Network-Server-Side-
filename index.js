const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to the server.')
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@volunteer-network.dbrvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const DutyCollection = client.db('volunteer-network').collection('social-welfare');

        // Get Information from Database //
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = DutyCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {

    }

}
run().catch(console.dir);


app.listen(port, () => {
    console.log('port running http://localhost:', port);
})