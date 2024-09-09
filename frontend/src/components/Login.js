// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, usenavigate } from 'react-router-dom'

// Login-komponentti käsittelee käyttäjän kirjautumisen
function Login() {
    // useState hook luo tilan kirjautumistiedoille: käyttäjänimi ja salasana
    const [credentials, setCredentials] = useState({ username: '', password: ''});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // handleChange-funktio päivittää tilan, kun käyttäjä muuttaa lomakkeen kenttää
    const handleChange = (e) => {
        // Päivitetään vastaava kenttä tilassa
        setCredentials({
            ...credentials,    
            [e.target.name]: e.target.value
        });
    };

    // handleSubmit-funktio käsittelee lomakkeen lähetyksen
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Lähetä POST-pyyntö backendille kirjautumistietojen kanssa
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                //Jos Kirjautuminen onnistuu, ohjataan käyttäjä uuteen sivuun
                navigate('/palvelut'); // Ohjaa käyttäjän "/palvelut" sivulle
            } else {
                throw new Error('Virheellinen käyttäjänimi tai salasana');
            }
        } catch (err) {
            //Näytetään virheilmoitus, josk irjautuminen epäonnistuu
            setError(err.message);
        }
    };
    // Lomakkeen renderöinti
    return (
        <div>
            <h2>Kirjaudu sisään</h2>
            {/* Näytetään virirheilmoitus, jos kirjautuminen epäonnistuu*/}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                Käyttäjänimi:
                    {/* Tekstikenttä, joka päivittää username-tilan */}
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Salasana:
                    {/* Salasanojen syöttökenttä, joka päivittää password-tilan */}
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                {/* Kirjautumispainike */}
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
    );
}

export default Login;