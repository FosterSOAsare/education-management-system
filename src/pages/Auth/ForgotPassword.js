import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";
import Error from "../../components/form/Error/Error";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const { firebase } = useAppContext();
	const { error, errorDispatchFunc, validations, clearError, waiting, setWaiting } = useAuthContext();
	const navigate = useNavigate();

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}

	function handleResetPassword(e) {
		setWaiting(true);
		e.preventDefault();
		if (email === "") {
			errorDispatchFunc({ type: "displayError", payload: "Please enter an email address" });
			return;
		}
		if (!validations.validateEmail(email)) {
			errorDispatchFunc({ type: "displayError", payload: "Please enter a valid emaul address" });
			return;
		}
		// Send reset mail
		firebase.sendResetMail(email, (res) => {
			if (res.error) {
				if (res.payload) {
					errorDispatchFunc({ type: "displayError", payload: res.payload });
				}
				return;
			}
			setWaiting(false);
			if (res === "success") {
				navigate(`/verifications?mode=resetPassword&email=${email}`);
			}
		});
	}

	return (
		<div className="container">
			<div id="auth">
				<div className="auth__container">
					<div className="container__text">
						<form>
							<h2 className="intro">Forgot your password?</h2>
							<div className="textInput">
								<label htmlFor="email">Email address</label>
								<input type="email" placeholder="Enter your email" id="email" value={email} onChange={handleEmailChange} onFocus={() => clearError()} />
							</div>
							{error.display === "block" && <Error text={error.text} />}
							{waiting && (
								<button type="button" className="primary waiting" onClick={handleResetPassword}>
									Waiting...
								</button>
							)}
							{!waiting && (
								<button type="button" className="primary" onClick={handleResetPassword}>
									Reset Password
								</button>
							)}
							<p className="redirect">
								<span>Remembered your password?</span>
								<a href="/login">Log In</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
