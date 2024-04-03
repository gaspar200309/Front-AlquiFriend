import React, { useState, useEffect } from "react";
import "./interestSection.css";
import { getLikes } from "../../../api/register.api";


const InterestModal = ({ onSaveInterests }) => {
    const [interests, setInterests] = useState([]);
    const [newInterest, setNewInterest] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedInterestIndex, setSelectedInterestIndex] = useState(null);
    const [likes, setLikes] = useState([]);
    const [idLikes, setIdLikes] = useState([]);


    useEffect(() => {
        async function loadInterests() {
            try {
                const res = await getLikes(); 
                setLikes(res.data); 
            } catch (error) {
                console.error("Error al cargar los intereses:", error);
            }
        }
        loadInterests();
    }, []);

    const handleRemoveInterest = (interestToRemove) => {
        setInterests(interests.filter((interest) => interest !== interestToRemove));
    };

    const handleNewInterestChange = (e) => {
        setNewInterest(e.target.value);
    };

    const handleAddNewInterest = () => {
        if (newInterest.trim() !== "" && !interests.includes(newInterest)) {
            setInterests([...interests, newInterest]);
            setNewInterest("");
        }
    };

    const handleInterestSelect = (interest) => {
        if (!interests.includes(interest.name)) {
            setInterests([...interests, interest.name]);
            setIdLikes([...idLikes, interest.id])
            
        }
        setSelectedInterestIndex();
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveInterests = () => {
        if (interests.idLikes < 2) {
            alert("Debe seleccionar al menos dos intereses");
        } else {
            console.log(interests)
            console.log(idLikes)
            onSaveInterests(idLikes);
            handleCloseModal();
        }
    };
    

    return (
        <>
            <div className="interest-body">
                <div className="col1">
                    <label htmlFor="newInterest">Gustos e Intereses</label>
                    <div className="input-n-button">
                        <input
                            className="inputInterests"
                            type="text"
                            id="newInterest"
                            placeholder="Ingrese un nuevo interes"
                            value={newInterest}
                            onChange={handleNewInterestChange}
                        />
                        <button className="plus-button" onClick={(e) => { e.preventDefault(); handleAddNewInterest(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 14h-6v6h-4v-6H4v-4h6V4h4v6h6z"/></svg>
                        </button>
                    </div>
                </div>
                <div className="col2">
                    <ul className="tags-grid">
                        {interests.map((interest, index) => (
                            <li className="customerInteres" key={index}>
                                <svg className="tag-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"/></svg>
                                {interest}
                                <button className="delete-tag-button" onClick={(e) => { e.preventDefault(); handleRemoveInterest(interest); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className="addInterest" onClick={(e) => { e.preventDefault(); handleShowModal(); }}>Otros intereses</button>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                    <h3 className="titleI">Seleccione Intereses</h3>
                        <div className="modal-content">
                            <ul className="tags-grid">
                                {likes.map((like, index) => (
                                    <li
                                        className={`customerInteres ${selectedInterestIndex === index ? 'selected-interest' : ''}`}
                                        key={index}
                                        onClick={() => handleInterestSelect(like)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"/></svg>
                                        {like.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
            <button className="saveInterest"  onClick={(e) => { e.preventDefault(); handleSaveInterests();  }}>Guardar</button>

                    </div>
                </div>
            )}
        </>
    );
};

export default React.memo(InterestModal);
