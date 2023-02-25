import React, { useRef } from "react";
import LoginImage from "../../assets/images/auth.png";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PasswordInput from "../../components/form/PasswordInput/PasswordInput";
import Error from "../../components/form/Error/Error";

const Login = () => {
	const { firebase, credentialsDispatchFunc } = useAppContext();
	const { errorDispatchFunc, error, clearError, validations, waiting, setWaiting } = useAuthContext();
	const navigate = useNavigate();
	const formRef = useRef();
	function logInUser(e) {
		e.preventDefault();
		setWaiting(true);
		let formData = new FormData(formRef.current);
		let email = formData.get("email"),
			password = formData.get("password");

		if (!email || !password) {
			errorDispatchFunc({ type: "displayError", payload: "Please fill in all credentials" });
			return;
		}
		// Form validation
		if (!validations.validateEmail(email)) {
			errorDispatchFunc({ type: "displayError", payload: "Please enter a valid email address" });
			return;
		}

		firebase.signInUser(email, password, async (res) => {
			if (res?.error) {
				if (res.payload) {
					errorDispatchFunc({ type: "displayError", payload: res.payload });
					setWaiting(false);
					return;
				}
				return;
			}

			// Checking if email is verified or not
			if (!res.emailVerified) {
				await Promise.resolve(firebase.sendVerificationEmail());
				setWaiting(false);
				navigate(`/verifications?mode=verifyemail&email=${email}`);
				return;
			}
			setWaiting(false);
			credentialsDispatchFunc({ type: "storeUserId", payload: res.uid });
			navigate("/dashboard");
		});
	}

	function useGoogleAuth(e) {
		e.preventDefault();
		firebase.useGoogleAuth((res) => {
			credentialsDispatchFunc({ type: "storeUserId", payload: res.uid });
			navigate("/dashboard");
		});
	}
	return (
		<main className="auth container" id="auth">
			<section className="auth__container">
				<article className="container__text">
					<form action="" ref={formRef}>
						<h3 className="intro">Welcome back!</h3>
						<div className="textInput">
							<label htmlFor="email">Enter email address: </label>
							<input type="text" placeholder="Enter your email" name="email" onFocus={() => clearError()} />
						</div>

						<PasswordInput label="Enter your password" name="password" forgotPassword={true} />

						{error.display === "block" && <Error text={error.text} />}
						{!waiting && (
							<button className="primary" disabled={error.display === "block"} onClick={logInUser}>
								Login
							</button>
						)}
						{waiting && (
							<button className="primary waiting" disabled>
								Waiting...
							</button>
						)}
						<button className="google-button" disabled={error.display === "block"} onClick={useGoogleAuth}>
							<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
							<span>Sign in with Google</span>
						</button>
						<p className="redirect">
							<span>Don't have an account?</span>
							<Link
								to="/register"
								onClick={(e) => {
									e.preventDefault();
									clearError();
									navigate("/register");
								}}>
								Sign up{" "}
							</Link>
						</p>
					</form>
				</article>
				<article className="container__image">
					<img src={LoginImage} alt="Register" />
				</article>
			</section>
		</main>
	);
};

export default Login;
