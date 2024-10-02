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
        res.status(200).send(characters);
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const characterId = +req.params.id
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const character = await collection.findOne({ id: characterId });
        res.status(200).send(character);
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const characterId = +req.params.id
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const filmsCollection = db.collection("films");
        const filmsCharactersCollection = db.collection("films_characters");

        const filmsCharacters = await filmsCharactersCollection.find({ character_id: characterId }).toArray();
        const filmsIds = filmsCharacters.map(fc => fc.film_id);

        const films = await filmsCollection.find({ id: { $in: filmsIds } }).toArray();

        res.status(200).send(films);
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});


// Planet Routes
app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");
        const planets = await collection.find().toArray();
        res.status(200).send(planets);
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const planetid = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");
        const planets = await collection.findOne({"id": planetid});
        res.status(200).send(planets);
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const planetId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const planet_films = db.collection("films_planets");
        const filmsCollection = db.collection("films");

        // Get all film IDs for the specified planet ID
        const planetFilms = await planet_films.find({ planet_id: planetId }).toArray();
        const filmIds = planetFilms.map(pf => pf.film_id);

        // Get film details for those IDs
        const films = await filmsCollection.find({ id: { $in: filmIds } }).toArray();

        res.status(200).send(films);
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const planetId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const charactersCollection = db.collection("characters");

        // Get all characters for the specified planet ID
        const planetChar = await charactersCollection.find({ homeworld: planetId }).toArray();
        res.status(200).send(planetChar);
    } catch (e) {
        res.status(500).send("Error Present", e);
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
        const film = await collection.findOne({ "id": filmId });
        res.status(200).send(film)
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const filmId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const films_characters = db.collection("films_characters");
        const charactersCollection = db.collection("characters");

        // Get all character IDs for the specified film ID
        const filmCharacters = await films_characters.find({ film_id: filmId }).toArray();
        const characterIds = filmCharacters.map(fc => fc.character_id);

        // Get character details for those IDs
        const characters = await charactersCollection.find({ id: { $in: characterIds } }).toArray();

        res.status(200).send(characters);
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const filmId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const filmsPlanetsCollection = db.collection("films_planets");
        const planetCollection = db.collection("planets");

        // Get all planet IDs for the specified film ID
        const filmPLanets = await filmsPlanetsCollection.find({ film_id: filmId }).toArray();
        const planetIds = filmPLanets.map(fp => fp.planet_id);

        // Get character details for those IDs
        const planets = await planetCollection.find({ id: { $in: planetIds } }).toArray();

        res.status(200).send(planets)
    } catch (e) {
        res.status(500).send("Error Present", e);
    }
});



// Listening to port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
