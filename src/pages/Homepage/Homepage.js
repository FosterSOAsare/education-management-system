import React from "react";
import { useAppContext } from "../../context/AppContext";

const Homepage = () => {
	const { firebase, credentialsDispatchFunc } = useAppContext();

	function logOutUser() {
		firebase.signOutUser((res) => {
			if (res.error) return;
			credentialsDispatchFunc({ type: "clearUserData" });
		});
	}
	return (
		<div>
			<button onClick={logOutUser}>Logout</button>
		</div>
	);
};

export default Homepage;
