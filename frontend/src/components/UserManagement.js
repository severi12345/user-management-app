// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';

// UserManagement-komponentti hoitaa käyttäjien hallinnan ja CRUD-toiminnot
function UserManagement() {
    // useState hook luo tilan käyttäjille ja uudelle käyttäjälle
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', bio: '' });
    const [editingUser, setEditingUser] = useState(null);

// useEffect hook suorittaa koodin, kun komponentti ladataan
    useEffect(() => {     
            // Hakee käyttäjät backendistä
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    
}, []);

    // handleChange-funktio päivittää tilan, kun käyttäjä muuttaa lomakkeen kenttää
    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };
    // handleSubmit-funktio käsittelee lomakkeen lähetyksen
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            // Päivittää käyttäjän backendissä
            fetch(`http://localhost:5000/api/users/${editingUser.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(updatedUser => {
                    setUsers(users.map(user => (user.username === updatedUser.username ? updatedUser : user)));
                    setEditingUser(null);
                    setNewUser({ username: '', bio: '' });
                });
        } else {
            // Lisää uuden käyttäjän backendissä
            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(user => setUsers([...users, user]));
        }
    }

    // handleEdit-funktio asettaa käyttäjän muokkaustilaan
    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser({ username: user.username, bio: user.bio });
    };

    // handleDelete-funktio poistaa käyttäjän listasta
	const handleDelete = (username) => {
        fetch(`http://localhost:5000/api/users/${username}`, {
            method: 'DELETE'
        })
            .then(() => setUsers(users.filter(user => user.username !== username)));
    };

    // Komponentin renderöinti
    return (
        <div>
            <h1>Käyttäjien hallinta</h1>
            {/* Lomakkeen lähetys kutsuu handleSubmit-funktiota */}
            <form onSubmit={handleSubmit}>
                <label>
                    Käyttäjänimi:
                    {/* Tekstikenttä, joka päivittää username-tilan ja estää muokkaamisen päivitystilan aikana */}
                    <input
                        type="text"
                        name="username"
                        value={newUser.username}
                        onChange={handleChange}
                        disabled={!!editingUser}
                    />
                </label>
                <br />
                <label>
Bio:
                    {/* Tekstialue, joka päivittää bio-tilan */}
                    <textarea
                        name="bio"
                        value={newUser.bio}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {/* Lomakkeen lähetyspainike, joka vaihtaa tekstinsä päivitys- tai lisäystilanteen mukaan */}
                <button type="submit">{editingUser ? 'Update User' : 'Lisää Käyttäjä'}</button>
            </form>
            <h2>Käyttäjäluettelo</h2>
            {/* Käyttäjälistan renderöinti */}
            <ul>
                {users.map(user => (
                    <li key={user.username}>
                        {user.username}: {user.bio}
                        {/* Edit-painike, joka mahdollistaa käyttäjän muokkaamisen */}
                        <button onClick={() => handleEdit(user)}>Muokkaa</button>
                        {/* Delete-painike, joka poistaa käyttäjän */}
                        <button onClick={() => handleDelete(user.username)}>Poista</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;