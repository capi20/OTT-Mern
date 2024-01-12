import Main from "./screens/Main";
import { AppProvider } from "./context/AppContext";

function App() {
	return (
		<AppProvider>
			<Main />
		</AppProvider>
	);
}

export default App;
