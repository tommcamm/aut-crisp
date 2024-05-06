/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NotFoundRoute, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen.ts";
import "./styles/tailwind.css";
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import { Route } from "./routes/__root.ts";
import { NotFoundPage } from "./pages/404.tsx";

// Amplify configuration
Amplify.configure(config);

// 404 configuration	
const notFoundRoute = new NotFoundRoute({
	getParentRoute: () => Route,
	component: () => NotFoundPage,
  })

const router = createRouter({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<App router={router} />
		</React.StrictMode>
	);
}
