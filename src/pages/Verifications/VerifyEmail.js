import React, { useState, useEffect } from "react";
import { IoMailUnreadOutline } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";
const VerifyEmail = ({ oobCode, mode }) => {
	const [status, setStatus] = useState(null);
	const { firebase } = useAppContext();
	console.log(oobCode);
	useEffect(() => {
		if (oobCode && mode === "verifyEmail") {
			firebase.verifyEmail(oobCode, (res) => {
				if (res.error) {
					setStatus("error");
					return;
				}
				// Email verified successfully
				setStatus("success");
			});
		}
	});
	return (
		<>
			{!status && !oobCode && (
				<>
					<IoMailUnreadOutline className="icon" />
					<p>A verification link has been sent to your email account. Click on link to verify your account </p>
				</>
			)}

			{oobCode && (
				<>
					{status === "success" && (
						<>
							<IoMailUnreadOutline className="icon" />
							<p> Your email has beev verified successfully</p>
						</>
					)}
					{status === "error" && (
						<>
							<IoMailUnreadOutline className="icon" />
							<p>Email verification link has expired. Please try logging in to receive a new one </p>
						</>
					)}
				</>
			)}
		</>
	);
};

export default VerifyEmail;
