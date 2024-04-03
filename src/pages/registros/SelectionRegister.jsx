import React from 'react';
import { NavLink } from 'react-router-dom';
import './SelectionRegister.css';

export default function SelectionRegister() {
  return (
    <div className="selection-register-container">
      <h1>FRent</h1>
      <p>Explora una galaxia extensa, encuentra una estrella para ti y ofrece tu brillo</p>
      <p>¿No tienes una cuenta? ¡Unete!</p>
      <div className='register-buttons'>
        <NavLink className='register-btn' to="/customer">
          <img src="https://www.reshot.com/preview-assets/icons/NL9E6GUZ5X/kyc-know-your-customer-NL9E6GUZ5X.svg" alt="Imagen registro cliente" />
          <p className='button-paragraph'>Registrate como cliente</p>
        </NavLink>
        <NavLink className='register-btn' to="/friend">
          <img src="https://www.reshot.com/preview-assets/icons/YVEUPRZTXB/refer-a-friend-YVEUPRZTXB.svg" alt="Imagen registro amigo" />  
          <p className='button-paragraph'>Registrate como amigo</p>
        </NavLink>
      </div>
      
    </div>
  );
}
