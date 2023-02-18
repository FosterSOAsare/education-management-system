import React from "react";

import { useLocation } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";

const Verifications = () => {
	const location = useLocation();
	const data = new URLSearchParams(location.search);
	const mode = data.get("mode");
	const oobCode = data.get("oobCode");

	return (
		<main className="container verifications">
			<VerifyEmail oobCode={oobCode} mode={mode} />
		</main>
	);
};

export default Verifications;
