import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Snackbar = ({ text, setSnackbar }) => {
	return (
		<aside className="snackbar">
			<p>{text}</p>
			<div className="icon" onClick={() => setSnackbar({ display: "none", text: "" })}>
				<AiOutlineClose />
			</div>
		</aside>
	);
};

export default Snackbar;
