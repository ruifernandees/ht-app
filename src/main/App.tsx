import React from 'react';
import {MainRouteCollection} from './routes/main.routes';

if (__DEV__) {
  import("../../reactotron-config").then(() => console.log("Reactotron Configured"));
}

export default function App() {
	return (
		<MainRouteCollection/>
	);
}
