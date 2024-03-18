import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import {MainRouteCollection} from './routes/main.routes';


if (__DEV__) {
  import("../../reactotron-config").then(() => console.log("Reactotron Configured"));
}

export default function App() {
	return (
		<PaperProvider theme={DefaultTheme}>
			<MainRouteCollection/>
		</PaperProvider>
	);
}
