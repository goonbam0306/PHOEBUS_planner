import { MongoClient } from 'mongodb';

async function BookedHandler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const {month, date, startTime, useTime, type} = data;

        const client = await MongoClient.connect('mongodb+srv://kbumj2003:bj3163113@cluster-phoebusplanner.rjdwy4s.mongodb.net/');

        const db = client.db();

        const bookedCollection = db.collention('booked');

        const result = await bookedCollection.insertOne(data);

        console.log(result);

        client.close();
        res.status(201).json({message: 'booked complete'});
    }
}

export default BookedHandler