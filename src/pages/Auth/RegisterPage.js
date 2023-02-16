import React, { useRef } from "react";
import RegisterImage from "../../assets/images/register.jpg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PasswordInput from "../../components/form/Error/PasswordInput/PasswordInput";
import Error from "../../components/form/Error/Error";

const RegisterPage = () => {
	const { firebase } = useAppContext();
	const { errorDispatchFunc, error, clearError } = useAuthContext();
	const navigate = useNavigate();
	const formRef = useRef();

	function createAccount(e) {
		e.preventDefault();
		let dead = null;
		let email = "",
			password = "";
		if (!dead) {
			errorDispatchFunc({ type: "displayError", payload: "This is also a test" });
			return;
		}
		firebase.createNewUserAuth(email, password, (res) => {
			if (res.error) {
				if (res.payload) {
					errorDispatchFunc({ type: "displayError", payload: res.payload });
					return;
				}
				return;
			}
			// Redirect to verification page
			navigate("/verifications?mode=verifyEmail");
		});
	}
	return (
		<main className="auth container" id="auth">
			<section className="auth__container">
				<article className="left">
					<form action="" ref={formRef} onSubmit={createAccount}>
						<div className="textInput">
							<label htmlFor="name">Full name: </label>
							<input type="text" placeholder="Enter full name" name="name" onFocus={() => clearError()} />
						</div>
						<div className="textInput">
							<label htmlFor="email">Email address: </label>
							<input type="text" placeholder="Enter your email" name="email" onFocus={() => clearError()} />
						</div>

						<PasswordInput label="Enter your password" name="password" />
						<PasswordInput label="Confirm your password" name="confirmpassword" />

						{error.display === "block" && <Error text={error.text} />}
						<button className="primary">Get Started</button>
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
