import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import App from "../App";
import Mapsview from "./Maps";

const Router=()=>(
	<BrowserRouter>
		<Switch>
		<Route path="/" component={App} exact />
		<Route path="/Maps" component={Mapsview} />
		</Switch>
	</BrowserRouter>

	);

export default Router;