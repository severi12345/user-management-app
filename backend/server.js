// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Ladataan ympäristömuuttujat
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Yhdistetään MongoDB-tietokantaan
mongoose.connect(process.env.MONGODB_URI, {
    }).then(() => console.log("MongoDB yhdistetty"))
  .catch(err => console.log(err));

// Määritellään käyttäjän skeema ja malli
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
});

const User = mongoose.model('User', userSchema);

// CRUD-operaatiot

// Käyttäjien haku
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Käyttäjän lisääminen
app.post('/api/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
});

// Käyttäjän päivittäminen
app.put('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const updatedUser = await User.findOneAndUpdate({ username }, req.body, { new: true });
    res.json(updatedUser);
});

// Käyttäjän poistaminen
app.delete('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    await User.findOneAndDelete({ username });
    res.status(204).send();
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Etsi käyttäjä tietokannasta
    const user = await User.findOne({ username });

    // Tarkista, että käyttäjä löytyy ja salasana on oikein
    if (user && user.password === password) {
        // Voit myös käyttää salasanan hashauksen tarkistusta, jos se on käytössä
        res.status(200).json({ message: 'Kirjautuminen onnistui' });
    } else {
        res.status(401).json({ message: 'Virheellinen käyttäjänimi tai salasana' });
    }
});

// Palvelimen käynnistys
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Palvelin toimii portissa ${PORT}`));
