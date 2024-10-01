// Imports
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // enable cors
const PORT = 3000;

// GET Route for /api/planets
app.get('/api/planets', async (req, res) => {
    try {
        res.send("Hello");
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("There has been an error")
    }
});


// Listening to port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
