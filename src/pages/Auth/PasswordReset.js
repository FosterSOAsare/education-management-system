import React, { useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";
import PasswordInput from "../../components/form/PasswordInput/PasswordInput";
import Error from "../../components/form/Error/Error";

const PasswordReset = ({ oobCode, setStatus }) => {
	const { firebase } = useAppContext();
	const { errorDispatchFunc, error, waiting, setWaiting, validations } = useAuthContext();
	const formRef = useRef();

	function resetPassword(e) {
		e.preventDefault();
		setWaiting(true);
		let form = formRef.current,
			formData = new FormData(form);
		let password = formData.get("password"),
			confirmpassword = formData.get("confirmpassword");
		if (!password || !confirmpassword) {
			errorDispatchFunc({
				type: "displayError",
				payload: "Please fill in all fields",
			});
			return;
		}

		if (!validations.validatePassword(password)) {
			errorDispatchFunc({
				type: "displayError",
				payload: "Password must contain at least eight characters, at least one number , both lower and uppercase letters and at least a special character",
			});
			return;
		}

		if (password !== confirmpassword) {
			errorDispatchFunc({
				type: "displayError",
				payload: "Passwords do not match",
			});
			return;
		}

		// Store new password
		firebase.storeNewPassword(oobCode, password, (res) => {
			setWaiting(false);
			if (res.error) {
				if (res.payload) {
					errorDispatchFunc({ type: "displayError", payload: res.payload });
				}
				return;
			}
			setStatus("success");
			return;
		});
	}
	return (
		<main className="auth container" id="auth">
			<section className="auth__container intro">
				<article className="container__text">
					<form action="" ref={formRef}>
						<h3 className="register__intro">Reset your password</h3>
						<h6 className="register__subtitle">Manage All Your Academic Activities Online</h6>

						<PasswordInput label="Enter your new password password" name="password" />
						<PasswordInput label="Confirm your new password" name="confirmpassword" />

						{error.display === "block" && <Error text={error.text} />}
						{!waiting && (
							<button className="primary" disabled={error.display === "block"} onClick={resetPassword}>
								Save Password
							</button>
						)}
						{waiting && (
							<button className="primary waiting" disabled>
								Waiting...
							</button>
						)}
					</form>
				</article>
			</section>
		</main>
	);
};

export default PasswordReset;
