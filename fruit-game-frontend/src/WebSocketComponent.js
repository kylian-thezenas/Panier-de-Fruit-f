import React, { useEffect } from 'react';
import WebSocket from 'websocket';

const WebSocketComponent = () => {
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080'); // Remplacez localhost:8080 par votre adresse serveur

        ws.onopen = () => {
            console.log('Connexion WebSocket établie');
        };

        ws.onmessage = (event) => {
            console.log('Message reçu du serveur:', event.data);
            // Traitez le message reçu du serveur ici
        };

        // Nettoyage de la connexion WebSocket lorsque le composant est démonté
        return () => {
            ws.close();
        };
    }, []);

    const handleClick = () => {
        ws.send('placer_fruit_pomme');
    };

    return (
        <div>
            <button onClick={handleClick}>Placer une pomme dans le panier</button>
        </div>
    );
};

export default WebSocketComponent;
