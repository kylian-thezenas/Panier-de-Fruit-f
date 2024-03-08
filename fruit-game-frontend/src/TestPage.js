import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:8080'); // URL de votre backend Java

function TestPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Écouter les événements du serveur
        socket.on('message', (data) => {
            console.log('Message reçu du serveur:', data);
            // Mettre à jour les messages avec le nouveau message reçu
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Nettoyage de la connexion WebSocket lorsque le composant est démonté
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleClick = () => {
        // Envoyer un message au serveur
        socket.emit('placer_fruit_pomme');
    };

    return (
        <div className="TestPage">
            <h1>Page de test WebSocket</h1>
            <button onClick={handleClick}>Placer une pomme dans le panier</button>
            <div>
                <h2>Résultats:</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TestPage;
