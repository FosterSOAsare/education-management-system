import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Snackbar = ({ text, setDisplaySnackbar }) => {
	return (
		<aside className="snackbar">
			<p>{text}</p>
			<div className="icon" onClick={() => setDisplaySnackbar(false)}>
				<AiOutlineClose />
			</div>
		</aside>
	);
};

export default Snackbar;
