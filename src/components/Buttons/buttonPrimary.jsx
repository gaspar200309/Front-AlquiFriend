import React from "react";
import "./buttonPrimary.css";

export function ButtonPrimary ({OnClick, label, type}) {
    return(
        <div className="primary-button">
            <button onClick={OnClick} type={type}>
                {label}
            </button>
        </div>
    );
}

