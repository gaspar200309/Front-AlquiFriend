import React from "react";
import "./buttonSecondary.css";

export function ButtonSecondary ({OnClick, label, type}) {
    return(
        <div className="secondary-button">
            <button onClick={OnClick} type={type}>
                {label}
            </button>
        </div>
    );
}

