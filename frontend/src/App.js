// src/App.js
import React from 'react';
// Tuodaan kaikki komponentit sovellukseen
import Register from './components/Register';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import Palvelut from './components/Palvelut';
import './App.css';
//import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; //Tämä ei toimi
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; //Näin piti muuttaa että toimi<zx


// App-komponentti on sovelluksen pääkomponentti
function App() {
    return (
        <Router>
            <div className="App">
                <h1>Käyttäjien hallintajärjestelmä</h1>
                {/* Navigointipalkki */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Kotisivu</Link>
                        </li>
                        <li>
                            <Link to="/rekisteröinti">Rekisteröinti</Link>
                        </li>
                        <li>
                            <Link to="/kirjautuminen">Kirjautuminen</Link>
                        </li>
                        <li>
                            <Link to="/käyttäjät">Käyttäjien hallinta</Link>
                        </li>
                    </ul>
                </nav>
                {/* Reititykset */}
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h2>Tervetuloa käyttäjien hallintajärjestelmään</h2>
                            <p>Ole hyvä ja navigoi käyttämällä yllä olevaa valikkoa.</p>
                        </div>
                    } />
                    <Route path="/rekisteröinti" element={<Register />} />
                    <Route path="/kirjautuminen" element={<Login />} />
                    <Route path="/käyttäjät" element={<UserManagement />} />
                    <Route path="/palvelut" element={<Palvelut />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App; 
