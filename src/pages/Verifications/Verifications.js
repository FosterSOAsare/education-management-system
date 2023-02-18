import React, { useState } from "react";
import AuthImage from "../../assets/images/auth.png";
import { useLocation } from "react-router-dom";
import Snackbar from "../../components/Snackbar/Snackbar";

import VerifyEmail from "./VerifyEmail";
import ResponseMessage from "./ResponseMessage";

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
						<article className="container__image">
							<img src={AuthImage} alt="Register" />
						</article>
						<article className="container__text">
							{mode.toLowerCase() === "verifyemail" && <VerifyEmail data={data} setStatus={setStatus} setSnackbar={setSnackbar} snackbar={snackbar} />}
							{oobCode && status && <ResponseMessage status={status} type="email verification" />}
						</article>
					</section>
				</>
			}
			{snackbar.display === "block" && <Snackbar text={snackbar.text} setSnackbar={setSnackbar} />}
		</main>
	);
};

export default RegisterPage;
