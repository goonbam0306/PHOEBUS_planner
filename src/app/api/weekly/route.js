import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {

    const client = await MongoClient.connect('mongodb+srv://kbumj2003:bj3163113@cluster-phoebusplanner.rjdwy4s.mongodb.net/');

    const week = request.nextUrl.searchParams.get('week');

    const db = client.db('test');

    const bookedCollection = db.collection('booked');

    const bookedInfo = await bookedCollection.find({week: week, weekly: 'true'}).toArray();

    client.close();

    return NextResponse.json({bookedInfo});
}