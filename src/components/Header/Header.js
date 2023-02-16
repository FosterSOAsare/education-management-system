import React from "react";
import { Outlet } from "react-router-dom";

const Header = () => {
	return (
		<>
			<header>Header</header>
			<Outlet context={{}} />
		</>
	);
};

export default Header;
