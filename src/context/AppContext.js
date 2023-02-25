import { createContext, useContext, useMemo, useReducer, useEffect } from "react";
import Firebase from "../backend/Firebase";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [userCredentials, credentialsDispatchFunc] = useReducer(credentialsFunc, { userId: JSON.parse(localStorage.getItem("userId")) || null, user: null });
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
		localStorage.setItem("userId", JSON.stringify(userCredentials?.userId));
		// Fetch and store user data
		userCredentials?.userId &&
			firebase.getUserData((res) => {
				if (res?.error) return;
				if (res.empty && navigator.onLine) {
					firebase.signOutUser((res) => {
						credentialsDispatchFunc({ type: "clearUserData" });
					});
					// Logout user
					return;
				}
				let { email, displayName, emailVerified, uid } = res;
				credentialsDispatchFunc({ type: "storeUserData", payload: { email, displayName, emailVerified, uid } });
			});
	}, [userCredentials?.userId, firebase, credentialsDispatchFunc]);

	return <AppContext.Provider value={{ firebase, credentialsDispatchFunc, userCredentials }}>{children}</AppContext.Provider>;
};

export function useAppContext() {
	return useContext(AppContext);
}

export default AppProvider;
