import React, { useState, useEffect } from 'react';
import './ListFriend.css';
import { NavLink } from 'react-router-dom';

import { getFriends } from '../../api/register.api';

export default function ListFriend() {
 

  const [friends, setFriends] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 
  const staticImage = "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"; 

  useEffect(() => {
        async function loadFriends(){
        const res = await getFriends();
        setFriends(res.data)
      }
      loadFriends();
  }, []);

  const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const dob = new Date(birthDate);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const openModal = () => {
    console.log('Image clicked:', staticImage);
    setSelectedImage(staticImage);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='list-friend'> 
      <h1>Lista de amigos</h1>
      <div className='lista'>
        {friends.map(friend => (
          <div key={friend.id_user} className="card" onClick={openModal}>
            <div className="top-card"></div>
            <img src={staticImage} alt="foto de perfil" />
            <div className="card-texts">
              <p className="name-card">{friend.first_name} {friend.last_name}</p>
              <p className="age-card">Edad: {calculateAge(friend.birth_date)} años</p>
              <p className="subtitle-card">Descripción</p>
              <p className="text-card">{friend.personal_description}</p>
            </div>          
            <NavLink className="button-card" to='/rentaForm'>Alquilar</NavLink>
          </div>
        ))}
      </div>
      {/* Modal para mostrar la imagen en tamaño grande */}
      {selectedImage && (
        <div className="modalF">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="imagen en tamaño grande" height="500px" width="500px"/>
          </div>
        </div>
      )}
    </div>
  );
}
