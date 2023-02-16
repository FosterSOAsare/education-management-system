import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Validations } from "../utils/Validations";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [error, errorDispatchFunc] = useReducer(errorFunc, { display: "none", text: "" });
	const [waiting, setWaiting] = useState(false);
	const validations = useMemo(() => new Validations(), []);

	useEffect(() => {
		if (error.display === "block") {
			setWaiting(false);
		}
	}, [error.display]);

	function errorFunc(state, action) {
		switch (action.type) {
			case "displayError":
				return { display: "block", text: action.payload };
			case "clearError":
				return { display: "none", text: "" };
			default:
				return state;
		}
	}

	function clearError() {
		errorDispatchFunc({ type: "clearError" });
	}
	return <AuthContext.Provider value={{ error, errorDispatchFunc, clearError, validations, waiting, setWaiting }}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
	return useContext(AuthContext);
}
export default AuthProvider;
