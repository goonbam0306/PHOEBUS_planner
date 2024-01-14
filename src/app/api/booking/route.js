import { MongoClient } from 'mongodb';

export async function GET() {
    
}

export async function POST(request) {
    const data = await request.json();
    console.log(data);

    const client = await MongoClient.connect('mongodb+srv://kbumj2003:bj3163113@cluster-phoebusplanner.rjdwy4s.mongodb.net/');

    const db = client.db('test');

    const bookedCollection = db.collection('booked');

    const result = await bookedCollection.insertOne(data);

    console.log(result);
    client.close();
    
    return Response.json({message: 'booked complete'})
}