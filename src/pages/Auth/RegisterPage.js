import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const RegisterPage = () => {
	const { firebase } = useAppContext();
	const { errorDispatchFunc } = useAuthContext();
	const navigate = useNavigate();

	function createAccount() {
		firebase.createNewUserAuth("asare4ster@gmail.com", "Asare4ster$...", (res) => {
			if (res.error) {
				if (res.payload) {
					errorDispatchFunc({ type: "displayError", payload: res.payload });
					return;
				}
				return;
			}
			// Redirect to verification page
			navigate("/verifications?mode=verifyEmail");
		});
	}
	return (
		<div>
			<button onClick={createAccount}>Register</button>
		</div>
	);
};

export default RegisterPage;
