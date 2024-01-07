const SelectInput = () => {
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
            id="difficulty">
            <option value="easy"> Easy </option>
            <option value="medium"> Medium </option>
            <option value="hard"> Hard </option>
        </select>
    )
}

export default SelectInput;