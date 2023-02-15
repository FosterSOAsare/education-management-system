import { createContext, useContext, useMemo } from "react";
import Firebase from "../backend/Firebase";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const firebase = useMemo(() => new Firebase(), []);
	return <AppContext.Provider value={{ firebase }}>{children}</AppContext.Provider>;
};

export function useAppContext() {
	return useContext(AppContext);
}

export default AppProvider;
