import React from "react";
import "./selectOptions.css";

export function SelectOptions({ label, 
                                id, 
                                name, 
                                errors, 
                                register, 
                                required, 
                                placeholder, 
                                options, 
                                value, 
                                onChange }) {
    return (
        <div className="select-component">
            <label htmlFor={id}>
                {label}
                {required && <span className="required">*</span>}
            </label>
            <select
                className="selectBox"
                id={id}
                name={name}
                {...register}
                value={value || ''}
                onChange={onChange}
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors && errors[id] && <span className="error-message">{errors[id].message}</span>}
        </div>
    );
}
