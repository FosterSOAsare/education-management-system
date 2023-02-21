import React, { useRef, useEffect } from "react";
import AuthImage from "../../assets/images/auth.png";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PasswordInput from "../../components/form/PasswordInput/PasswordInput";
import Error from "../../components/form/Error/Error";

const RegisterPage = () => {
	const { firebase } = useAppContext();
	const { errorDispatchFunc, error, clearError, waiting, setWaiting, validations } = useAuthContext();
	const navigate = useNavigate();
	const formRef = useRef();

	useEffect(() => {
		const inputs = document.querySelectorAll("form input");
		let data = {
			name: "Asare Foster Dead",
			email: "donrixy@gmail.com",
			password: "Asare4ster$...",
			confirmpassword: "Asare4ster$...",
		};
		inputs.forEach((e) => {
			e.value = data[e.name];
		});
	});

	function createAccount(e) {
		e.preventDefault();
		setWaiting(true);
		let formData = new FormData(formRef.current);
		let email = formData.get("email").trim(),
			password = formData.get("password").trim(),
			confirmPassword = formData.get("confirmpassword"),
			fullname = formData.get("name");

		if (!email || !password || !confirmPassword || !fullname) {
			errorDispatchFunc({ type: "displayError", payload: "Please fill in all credentials" });
			return;
		}

		// Form validation
		if (!validations.validateEmail(email)) {
			errorDispatchFunc({ type: "displayError", payload: "Please enter a valid email address" });
			return;
		}

		if (!validations.validateFullname(fullname)) {
			errorDispatchFunc({ type: "displayError", payload: "Please enter a valid full name. Must contain at least 2 names" });
			return;
		}
		if (!validations.validatePassword(password)) {
			errorDispatchFunc({
				type: "displayError",
				payload: "Password must contain at least eight characters, at least one number , both lower and uppercase letters and at least a special character",
			});
			return;
		}

		if (password !== confirmPassword) {
			errorDispatchFunc({ type: "displayError", payload: "Passwords do not match" });
			return;
		}

		firebase.createNewUserAuth(email, password, (res) => {
			if (res.error) {
				if (res.payload) {
					errorDispatchFunc({ type: "displayError", payload: res.payload });
					setWaiting(false);
					return;
				}
				return;
			}
			// Store userData and redirect to verifcations
			firebase.updateUserProfile(fullname, (res) => {
				console.log(res)
				if (res?.error) return;
				setWaiting(false);
				// Redirect to verification page
				navigate(`/verifications?mode=verifyemail&email=${email}`);
			});
		});
	}

	function useGoogleAuth(e) {
		e.preventDefault();
		firebase.useGoogleAuth((res) => {
			console.log(res);
		});
	}
	return (
		<main className="auth container" id="auth">
			<section className="auth__container intro">
				<article className="container__text">
					<form action="" ref={formRef}>
						<h3 className="register__intro">Create An Account</h3>
						<h6 className="register__subtitle">Manage All Your Academic Activities Online</h6>
						<div className="textInput">
							<label htmlFor="name">Full name: </label>
							<input type="text" placeholder="Enter full name" name="name" onFocus={() => clearError()} autoComplete="true" />
						</div>
						<div className="textInput">
							<label htmlFor="email">Email address: </label>
							<input type="text" placeholder="Enter your email" name="email" onFocus={() => clearError()} autoComplete="true" />
						</div>

						<PasswordInput label="Enter your password" name="password" />
						<PasswordInput label="Confirm your password" name="confirmpassword" />

						{error.display === "block" && <Error text={error.text} />}
						{!waiting && (
							<button className="primary" disabled={error.display === "block"} onClick={createAccount}>
								Get Started
							</button>
						)}
						{waiting && (
							<button className="primary waiting" disabled>
								Waiting...
							</button>
						)}
						<button className="google-button" disabled={error.display === "block"} onClick={useGoogleAuth}>
							<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
							<span>Sign up with Google</span>
						</button>
						<p className="redirect">
							<span>Already have an account?</span>
							<Link
								to="/login"
								onClick={(e) => {
									e.preventDefault();
									clearError();
									navigate("/login");
								}}>
								Login
							</Link>
						</p>
					</form>
				</article>
				<article className="container__image">
					<img src={AuthImage} alt="Register" />
				</article>
			</section>
		</main>
	);
};

export default RegisterPage;
