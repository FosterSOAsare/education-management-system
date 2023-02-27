import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const ResponseMessage = ({ status, type }) => {
	console.log(status, type);
	return (
		<section className="content">
			<div className={`verification__icon${" verification__" + status}`}>{status === "success" ? <TiTick /> : status === "error" ? <BiErrorCircle /> : ""}</div>
			<p className="subtitles">{type === "email verification" && status === "error" && "Email verfication code has either been used or has expired . Please request a new link"}</p>
			{type === "email verification" && status === "success" && (
				<>
					<p className="subtitles">Account has been successfully verified</p>
					<Link to="/login" className="manual__redirect">
						Click to login to your account
					</Link>
				</>
			)}
			<p className="subtitles">{type === "password reset" && status === "error" && "Password reset link has either been used or has expired . Please request a new link"}</p>
			{type === "password reset" && status === "success" && (
				<>
					<p className="subtitles">Password has been reset successfully</p>
					<Link to="/login" className="manual__redirect">
						Click to login to your account
					</Link>
				</>
			)}
		</section>
	);
};

export default ResponseMessage;
