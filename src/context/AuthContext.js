import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [error, errorDispatchFunc] = useReducer(errorFunc, { display: "none", text: "" });

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
	return <AuthContext.Provider value={{ error, errorDispatchFunc }}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
	return useContext(AuthContext);
}
export default AuthProvider;
