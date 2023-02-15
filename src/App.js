import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import { useAppContext } from "./context/AppContext";

function App() {
	const { firebase } = useAppContext();
	console.log(firebase);

	return (
		<div className="App">
			<Routes>
				<Route path="" element={<Homepage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
