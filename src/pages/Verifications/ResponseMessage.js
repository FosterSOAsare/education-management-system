import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const ResponseMessage = ({ status, type }) => {
	return (
		<section className="content">
			<div className={`verification__icon${" verification__" + status}`}>{status === "success" ? <TiTick /> : <BiErrorCircle />}</div>
			<p className="subtitles">{type === "email verification" && status === "error" && "Email verfication code has either been used or has expired "}</p>
			{type === "email verification" && status === "success" && (
				<>
					<p className="subtitles">Account has been successfully verified</p>
					<Link to="/login" className="manual__redirect">
						Click to login when not redirected automatically
					</Link>
				</>
			)}
		</section>
	);
};

export default ResponseMessage;
