import React, { useRef } from "react";
import RegisterImage from "../../assets/images/register.jpg";
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
			// Store userData and redirect to veirifcations
			firebase.storeUser(res?.user?.uid, email, fullname, (res) => {
				if (res?.error) return;
				setWaiting(false);
				// Redirect to verification page
				navigate("/verifications?mode=verifyEmail");
			});
		});
	}
	return (
		<main className="auth container" id="auth">
			<section className="auth__container">
				<article className="left">
					<form action="" ref={formRef} onSubmit={createAccount}>
						<h2 className="register__intro">Create An Account</h2>
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
							<button className="primary" disabled={error.display === "block"}>
								Get Started
							</button>
						)}
						{waiting && (
							<button className="primary waiting" disabled>
								Waiting...
							</button>
						)}

						<p className="redirect">
							Already have an account? <Link to="/login">Login </Link>
						</p>
					</form>
				</article>
				<article className="right">
					<img src={RegisterImage} alt="Register" />
				</article>
			</section>
		</main>
	);
};

export default RegisterPage;
