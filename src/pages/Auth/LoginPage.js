import React, { useRef } from "react";
import LoginImage from "../../assets/images/login.jpg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PasswordInput from "../../components/form/Error/PasswordInput/PasswordInput";
import Error from "../../components/form/Error/Error";

const Login = () => {
	const { firebase, credentialsDispatchFunc } = useAppContext();
	const { errorDispatchFunc, error, clearError } = useAuthContext();
	const navigate = useNavigate();
	const formRef = useRef();
	function logInUser(e) {
		let email = "",
			password = "";
		e.preventDefault();
		firebase.signInUser(email, password, (res) => {
			console.log(res);
			if (res?.error) {
				if (res.payload) {
					errorDispatchFunc({ type: "displayError", payload: res.payload });
					return;
				}
				return;
			}
			credentialsDispatchFunc({ type: "storeUserId", payload: res });
			navigate("/dashboard");
		});
	}
	return (
		<main className="auth container" id="auth">
			<section className="auth__container">
				<article className="left">
					<form action="" ref={formRef} onSubmit={logInUser}>
						<h3 className="intro">Welcome back!</h3>
						<div className="textInput">
							<label htmlFor="email">Enter email address: </label>
							<input type="text" placeholder="Enter your email" name="email" onFocus={() => clearError()} />
						</div>

						<PasswordInput label="Enter your password" name="password" />

						{error.display === "block" && <Error text={error.text} />}
						<button className="primary">Login</button>
						<p className="redirect">
							Don't have an account? <Link to="/register">Sign up </Link>
						</p>
					</form>
				</article>
				<article className="right">
					<img src={LoginImage} alt="Register" />
				</article>
			</section>
		</main>
	);
};

export default Login;
