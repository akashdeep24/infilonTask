import { Provider } from "react-redux";
import Home from "./src/Home";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Home />
			</PersistGate>
		</Provider>
	);
}
