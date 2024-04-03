import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFriends } from '../../api/register.api';
import './Navbar.css';

export default function NavBar() {
    const [modalVisible, setModalVisible] = useState(false);
    const [friends, setFriends] = useState([]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        async function loadFriends() {
            try {
                const res = await getFriends();
                setFriends(res.data);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        }
        loadFriends();
    }, []);

    return (
        <>
            <nav className="navbar-body">
                <NavLink to="/">
                    <img className="logo-img" src="https://i.ibb.co/hZwZSSN/Logo-frent.png" alt="Logo-frent" />
                </NavLink>
                <ul className="navbar-options-list">
                    <li>
                        <NavLink className="navbar-option" to="/">Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink className="navbar-option" to="listfriend">Amigos</NavLink>
                    </li>
                    <li>
                        <NavLink className="navbar-option" to="form"> Registrarse</NavLink>
                    </li>
                    <li>
                        <NavLink className="navbar-option" to="/rentalSectio">Alquileres</NavLink>
                    </li>
                    <li onClick={openModal}>
                        <div className="navbar-option">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2" />
                                <circle cx="19" cy="5" r="4" fill="red" />
                            </svg>
                        </div>
                    </li>
                </ul>
            </nav>
            {modalVisible && (
                <div className="modal-notification" onMouseLeave={closeModal}>
                    <h3>Notificaciones</h3>
                    {friends &&
                        friends.map((friend) => (
                            <div key={friend.first_name} className="card-modal-notification">
                                <img src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg" alt="Foto de perfil" />
                                <div className="card-text">
                                    <p className="name-card">{friend.first_name} {friend.last_name}</p>
                                    <p>Acepto ser tu amigo!</p>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </>
    )
}
