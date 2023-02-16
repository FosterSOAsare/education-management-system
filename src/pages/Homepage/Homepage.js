import React from "react";
import { useAppContext } from "../../context/AppContext";

const Homepage = () => {
	const { firebase, credentialsDispatchFunc } = useAppContext();

	function logOutUser() {
		firebase.signOutUser((res) => {
			if (res?.error) return;
			credentialsDispatchFunc({ type: "clearUserData" });
		});
	}

	function changePassword() {
		firebase.changeUserPassword("Asare4ster$....", "Asare4ster$...", (res) => {
			console.log(res);
		});
	}
	return (
		<div>
			<button onClick={logOutUser}>Logout</button>
			<button onClick={changePassword}>Change Password</button>
		</div>
	);
};

export default Homepage;
