import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { Carousel } from "../components/layout/carousel";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useSearch, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const removeSearchParameter = (parameter :string) :void => {
	const currentUrl = new URL(window.location.href);
	currentUrl.searchParams.delete(parameter);
	
};

export const Home = (): FunctionComponent => {
	const searchParameters :Record<string, unknown> = useSearch({strict: false});

	const fromSignUp = searchParameters['fromSignUp'];
	const fromSignIn = searchParameters['fromSignIn'];
	const fromSignOut = searchParameters['fromSignOut'];

	// Show a toast if sign in/up is completed successfully.
	useEffect(() => {
		if (fromSignUp) {
			console.log("From sign up")
			toast.success("Successfully signed up!");
			
		} else if (fromSignIn) {
			toast.success("Signed in successfully");
		} else if (fromSignOut) {
			toast.success("Signed out successfully");
			removeSearchParameter('fromSignOut');
		}
	}, [fromSignUp, fromSignIn, fromSignOut]); // Dependencies to trigger the effect

	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar/>
			<Carousel />
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light" />
			<Footer/>
		</div>
	);
};
