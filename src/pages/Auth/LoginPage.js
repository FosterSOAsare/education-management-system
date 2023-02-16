import React from "react";
import { useAppContext } from "../../context/AppContext";

const Login = () => {
	const { firebase, credentialsDispatchFunc } = useAppContext();
	function logInUser() {
		firebase.signInUser("asare4ster@gmail.com", "Asare4ster$...", (res) => {
			console.log(res);
			if (res?.error) {
				return;
			}
			credentialsDispatchFunc({ type: "storeUserId", payload: res });
		});
	}
	return (
		<div>
			<button onClick={logInUser}>Login</button>
		</div>
	);
};

export default Login;
