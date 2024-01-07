import React from "react";

const SelectInput = ({ selectedDifficulty, onChange }) => {
    return (
        <select
            style={{
                width: "100px",
                padding: "10px",
                border: "none",
                borderRadius: "10px",
                fontFamily: "Archivo Black, sans-serif",
                fontSize: "1em",
            }}
            name="difficulty"
            id="difficulty"
            value={selectedDifficulty}
            onChange={onChange}
        >
            <option value="easy"> Easy </option>
            <option value="medium"> Medium </option>
            <option value="hard"> Hard </option>
        </select>
    )
}

export default SelectInput;
