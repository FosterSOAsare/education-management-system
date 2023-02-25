import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Snackbar from "../../components/Snackbar/Snackbar";

import VerifyEmail from "./VerifyEmail";
import ResponseMessage from "./ResponseMessage";
import PasswordReset from "./PasswordReset";

const RegisterPage = () => {
	// const { firebase } = useAppContext();
	const [status, setStatus] = useState(null);
	const [snackbar, setSnackbar] = useState({ display: "none", text: "" });
	const location = useLocation();
	const data = new URLSearchParams(location.search),
		mode = data.get("mode"),
		oobCode = data.get("oobCode");

	// const { errorDispatchFunc, error, clearError, waiting, setWaiting, validations } = useAuthContext();
	// const navigate = useNavigate();
	// const formRef = useRef();

	return (
		<main className="auth container" id="auth">
			{
				<>
					<section className="auth__container intro">
						<article className="container__text">
							{mode.toLowerCase() === "verifyemail" ||
								(mode.toLowerCase() === "resetpassword" && <VerifyEmail data={data} setStatus={setStatus} setSnackbar={setSnackbar} snackbar={snackbar} />)}
							{/* This is a message that is shown after a successful verification */}
							{oobCode && status && mode.toLowerCase() === "verifyemail" && <ResponseMessage status={status} type="email verification" />}
							{oobCode && status === "success" && mode.toLowerCase() === "resetpassword" && <PasswordReset />}
						</article>
					</section>
				</>
			}
			{snackbar.display === "block" && <Snackbar text={snackbar.text} setSnackbar={setSnackbar} />}
		</main>
	);
};

export default RegisterPage;
