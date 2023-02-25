import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "../../components/Snackbar/Snackbar";
import { useAppContext } from "../../context/AppContext";
import VerifyEmail from "./VerifyEmail";
import ResponseMessage from "./ResponseMessage";
import PasswordReset from "../Auth/PasswordReset";
import Loading from "../../components/Loading/Loading";

const RegisterPage = () => {
	const { loading, firebase, setLoading } = useAppContext();
	const [status, setStatus] = useState(null);
	const [snackbar, setSnackbar] = useState({ display: "none", text: "" });
	const location = useLocation();
	const data = new URLSearchParams(location.search),
		mode = data.get("mode"),
		oobCode = data.get("oobCode"),
		email = data.get("email");
	const navigate = useNavigate();

	useEffect(() => {
		if (!oobCode && !email) {
			navigate("/login");
			return;
		}
		if (email && !oobCode) {
			setLoading(false);
			return;
		}

		// For verifying the verifyEmail code from the link
		oobCode &&
			mode.toLowerCase() === "verifyemail" &&
			firebase.verifyEmail(oobCode, (res) => {
				setLoading(false);
				if (res?.error) {
					setStatus("error");
					return;
				}
				// Email verified successfully
				setStatus("success");
			});

		// For verifying the resetPassword code from the link
		oobCode &&
			mode.toLowerCase() === "resetpassword" &&
			firebase.verifyEmailReset(oobCode, (res) => {
				setLoading(false);
				if (res?.error) {
					setStatus("error");
					return;
				}
				setStatus(null);
				// Display set up new password form
				// Email verified successfully
			});
	});

	return (
		<main className="auth container" id="auth">
			<>
				<section className="auth__container intro">
					{!loading && (
						<>
							<article className="container__text">
								{(mode.toLowerCase() === "verifyemail" || mode.toLowerCase() === "resetpassword") && (
									<VerifyEmail data={data} setStatus={setStatus} setSnackbar={setSnackbar} snackbar={snackbar} />
								)}
								{/* This is a message that is shown after a successful verification */}
								{oobCode && status && mode.toLowerCase() === "verifyemail" && <ResponseMessage status={status} type="email verification" />}
								{oobCode && !status && mode.toLowerCase() === "resetpassword" && <PasswordReset oobCode={oobCode} setStatus={setStatus} />}
								{oobCode && status && mode.toLowerCase() === "resetpassword" && <ResponseMessage status={status} type="password reset" />}
							</article>
						</>
					)}
					{loading && <Loading />}
				</section>
			</>

			{snackbar.display === "block" && <Snackbar text={snackbar.text} setSnackbar={setSnackbar} />}
		</main>
	);
};

export default RegisterPage;
