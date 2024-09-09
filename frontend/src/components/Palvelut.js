// src/components/Login.js
import React, { useState } from 'react';

function Palvelut() {
    return (
    <div>
        <h1>Palvelusivu</h1>
        <p>Tervetuloa palvelusivuille! Tämä on sivu, jolla on käyttettävissä on vain kirjautuneille käyttäjille.</p>
        <h2>Käyttäjän tiedot</h2>
        <p>Täällä voit tarkastella ja hallita tietojasi.</p>
        <button onClick={() => alert('Profiilin hallinta on tulossa pian!')}>
        Hallitse profiilia
        </button>
        <h2>Toiminnot</h2>
        <p>tarjoamme erilaisia toimintoja kirjautuneille käyttäjille.</p>
        <button onClick={() => alert('Toiminto suoritettu!')}>
        Suorita toiminto
        </button>
    </div>
    );
};

export default Palvelut;