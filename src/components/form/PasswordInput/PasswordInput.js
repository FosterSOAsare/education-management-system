import React, { useRef, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiEyeOff } from "react-icons/fi";
import { useAuthContext } from "../../../../context/AuthContext";

const PasswordInput = ({ name, label }) => {
	const [type, setType] = useState("password");
	const { clearError } = useAuthContext();
	let inputRef = useRef(null);

	function toggleType() {
		setType((prev) => (prev === "password" ? "text" : "password"));
	}
	return (
		<div
			className="passwordField"
			onClick={() => {
				clearError();
				inputRef.current.focus();
			}}>
			<label htmlFor={name}>{label}: </label>
			<div className="inputField">
				<input type={type} placeholder="**********" name={name} aria-placeholder={label} aria-label={name} ref={inputRef} />
				<div className="icon" onClick={toggleType}>
					{type === "password" ? <AiFillEye /> : <FiEyeOff />}
				</div>
			</div>
		</div>
	);
};

export default PasswordInput;
