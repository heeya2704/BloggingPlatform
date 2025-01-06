import { useState } from "react";
const InputBox = ({ name, type, id, value, placeholder, icon, onChange }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div className="relative w-[100%] mb-4">
            <input
                name={name}
                type={type === "password" ? (passwordVisible ? "text" : "password") : type}
                id={id}
                placeholder={placeholder}
                value={value} // Use value instead of defaultValue
                onChange={onChange} // Make sure to include this prop
                className="input-box"
            />
            <i className={`fi ${icon} input-icon`}></i>
            {type === "password" && (
                <i
                    className={`fi fi-rs-eye ${!passwordVisible ? "-crossed" : ""} input-icon left-[auto] right-4 cursor-pointer`}
                    onClick={() => setPasswordVisible((currentVal) => !currentVal)}
                ></i>
            )}
        </div>
    );
};

export default InputBox;
