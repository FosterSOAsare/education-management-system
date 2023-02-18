import React from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Homepage from "./pages/Homepage/Homepage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Verifications from "./pages/Verifications/Verifications";

function LogInRequired({ children }) {
	const { userCredentials } = useAppContext();
	return userCredentials?.userId ? children : <Navigate to="/login"></Navigate>;
}

function CheckLoggedIn({ children }) {
	const { userCredentials } = useAppContext();
	return !userCredentials?.userId ? children : <Navigate to="/dashboard"></Navigate>;
}
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="" element={<Homepage />}></Route>
				<Route path="/verifications" element={<Verifications />}></Route>
				<Route
					path="/login"
					element={
						<CheckLoggedIn>
							<LoginPage />
						</CheckLoggedIn>
					}></Route>
				<Route
					path="/register"
					element={
						<CheckLoggedIn>
							<RegisterPage />
						</CheckLoggedIn>
					}></Route>

				<Route
					path="/dashboard"
					element={
						<LogInRequired>
							<Dashboard />
						</LogInRequired>
					}></Route>
			</Routes>
		</div>
	);
}

export default App;
