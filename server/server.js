// Imports
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

const app = express();
app.use(cors()); // enable cors
const PORT = 3000;

// Initializing Mongo Client
dotenv.config();
const url = process.env.MONGO_DB_URL
const dbName = process.env.MONGO_DB

// Character Routes
app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const characters = await collection.find().toArray();
        res.status(200).send(characters)
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

// Planet Routes
app.get('/api/planets', async (req, res) => {
    try {
        res.send("Hello");
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("There has been an error")
    }
});

// Film Routes
app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");
        const films = await collection.find().toArray();
        res.status(200).send(films)
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const filmId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");
        const films = await collection.find({ "id": filmId }).toArray();
        res.status(200).send(films)
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const filmId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films_characters");
        const characters = await collection.find({ "film_id": filmId }).toArray();
        res.status(200).send(characters)
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const filmId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");
        const films = await collection.find({ "id": filmId }).toArray();
        res.status(200).send(films)
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});



// Listening to port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
