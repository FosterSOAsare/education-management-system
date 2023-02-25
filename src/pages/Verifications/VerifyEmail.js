import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const VerifyEmail = ({ data, setStatus, setSnackbar, snackbar }) => {
	const { firebase } = useAppContext();
	const email = data.get("email"),
		oobCode = data.get("oobCode"),
		mode = data.get("mode");
	const navigate = useNavigate();
	useEffect(() => {
		// setNotFound
		if (!oobCode && !email) {
			return;
		}

		// For verifying the verifyEmail code from the link
		oobCode &&
			mode.toLowerCase() === "verifyemail" &&
			firebase.verifyEmail(oobCode, (res) => {
				if (res?.error) {
					setStatus("error");
					return;
				}
				// Email verified successfully
				setStatus("success");

				setTimeout(() => {
					navigate("/login");
				}, 6000);
			});

		// For verifying the resetPassword code from the link
		oobCode &&
			mode.toLowerCase() === "resetpassword" &&
			firebase.verifyEmailReset(oobCode, (res) => {
				console.log(res)
				if (res?.error) return;
				// Display set up new password form
				// Email verified successfully
				setStatus("success");
			});
	});

	async function resendVerificationEmail() {
		try {
			let verified = await firebase.checkVerifiedEmail();

			if (!verified) {
				await firebase.sendVerificationEmail();
				setSnackbar({ display: "block", text: "Email resent successfully" });
				setTimeout(() => {
					setSnackbar({ display: "none", text: "" });
				}, 5000);
				return;
			}
			setSnackbar({ display: "block", text: "Email address already verified. Proceed to log in" });
			setTimeout(() => {
				navigate("/login");
			}, 5000);
		} catch (e) {
			if (e.payload === "auth-error") {
				console.log("not Found");
				// Set not found
			}
		}
	}
	async function resendResetEmail() {
		try {
			firebase.sendResetMail(email, (res) => {
				if (res?.error) return;
				setSnackbar({ display: "block", text: "Email resent successfully" });
				setTimeout(() => {
					setSnackbar({ display: "none", text: "" });
				}, 5000);
				return;
			});

			return;
		} catch (e) {
			if (e.payload === "auth-error") {
				console.log("not Found");
				// Set not found
			}
		}
	}
	return (
		<>
			{email && (
				<section className="content">
					<div className="verification__icon">
						<HiMail />
					</div>
					<h3 className="intro">Check your email</h3>
					<p className="subtitles">
						We have sent an email verification link to <span style={{ fontWeight: "bold", opacity: "1" }}>{email}</span> .{" "}
						{mode.toLowerCase() === "verifyemail" ? "Click link to verify account creation." : "Click on link to proceed to resetting your password"}
					</p>
					<button className="primary verification__button">Open email app</button>
					<p className="resend">
						Didn't receive email? <span onClick={mode.toLowerCase() === "verifyemail" ? resendVerificationEmail : resendResetEmail}>Click to resend</span>
					</p>
				</section>
			)}
		</>
	);
};

export default VerifyEmail;
