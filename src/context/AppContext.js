import { createContext, useContext, useMemo, useReducer, useEffect } from "react";
import Firebase from "../backend/Firebase";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [userCredentails, credentialsDispatchFunc] = useReducer(credentialsFunc, { userId: JSON.parse(localStorage.getItem("userId")) || null, user: null });
	const firebase = useMemo(() => new Firebase(), []);

	function credentialsFunc(state, action) {
		switch (action.type) {
			case "storeUserId":
				return { ...state, userId: action.payload };
			case "storeUserData":
				return { ...state, user: action.payload };
			case "clearUserData":
				return { userId: null, user: null };
			default:
				return state;
		}
	}

	useEffect(() => {
		localStorage.setItem("userId", JSON.stringify(userCredentails?.userId));
	}, [userCredentails?.userId]);

	return <AppContext.Provider value={{ firebase, credentialsDispatchFunc, userCredentails }}>{children}</AppContext.Provider>;
};

export function useAppContext() {
	return useContext(AppContext);
}

export default AppProvider;
