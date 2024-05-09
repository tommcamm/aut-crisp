import type { FunctionComponent } from "../../common/types";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";


export const HomeToasts = (): FunctionComponent => {
    const searchParameters :Record<string, unknown> = useSearch({strict: false});

	const fromSignUp = searchParameters['fromSignUp'];
	const fromSignIn = searchParameters['fromSignIn'];
	const fromSignOut = searchParameters['fromSignOut'];
	const fromConfirm = searchParameters['fromConfirm'];

	// Show a toast if sign in/up is completed successfully.
	useEffect(() => {
		if (fromSignUp) {
			console.log("From sign up")
			toast.success("Successfully signed up!");
			
		} else if (fromSignIn) {
			toast.success("Signed in successfully");
		} else if (fromSignOut) {
			toast.success("Signed out successfully");
		} else if (fromConfirm) {
			toast.success("Account verified successfully");
		} 


	}, [fromSignUp, fromSignIn, fromSignOut, fromConfirm]); // Dependencies to trigger the effect
    return(
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
    );
}