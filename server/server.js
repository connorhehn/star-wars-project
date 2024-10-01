// Imports
import express from 'express';

const app = express();
const PORT = 3000;

// GET Route for /api/planets
app.get('/api/planets', async (req, res) => {
    try {
        console.log(req);
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("There has been an error")
    }
});


// Listening to port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
