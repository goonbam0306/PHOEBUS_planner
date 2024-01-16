import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {

    const client = await MongoClient.connect('mongodb+srv://kbumj2003:bj3163113@cluster-phoebusplanner.rjdwy4s.mongodb.net/');

    const month = request.nextUrl.searchParams.get('month');
    const date = request.nextUrl.searchParams.get('date');

    const db = client.db('test');

    const bookedCollection = db.collection('booked');

    const bookedInfo = await bookedCollection.find({month: month, date: date}).toArray();

    return NextResponse.json({bookedInfo});
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
    
    return NextResponse.json({message: 'booked complete'})
}