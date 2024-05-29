import type { FunctionComponent } from "../../common/types";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { successToast } from "../../common/enums";


export const Toasts = (): FunctionComponent => {
    const searchParameters :Record<string, unknown> = useSearch({strict: false});

	const toastID = searchParameters['toastID'];

	// Show a toast if sign in/up is completed successfully.
	useEffect(() => {
		switch (toastID) {
			case successToast.signUp: {
				toast.success("Successfully signed up");
				break;
			}
			case successToast.signIn: {
				toast.success("Signed in successfully");
				break;
			}
			case successToast.signOut: {
				toast.success("Signed out successfully");
				break;
			}
			case successToast.confirmedAcc: {
				toast.success("Account verified successfully");
				break;
			}
			case successToast.notAuthenticated: {
				toast.warning("Authentication needed to access that page");
				break;
			}
			case successToast.applicationSent: {
				toast.success("Application sent successfully");
				break;
			}
			case successToast.applicationRemoved: {
				toast.success("Application removed successfully");
				break;
			}
		} 
	}, [toastID]);

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