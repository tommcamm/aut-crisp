/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-duplicate-imports */
import type React from "react";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { signIn } from "aws-amplify/auth";
import type { FunctionComponent } from "../common/types";
import { useEffect, useState } from "react";
import { Route } from "../routes/auth";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { successToast } from "../common/enums";
import { Toasts } from "../components/ui/toasts";
import { isUserAuthenticated } from "../common/utils";
import { UserConfirmForm } from "../components/forms/user-confirm";

export const SignInPage = (): FunctionComponent => {
	const navigate = useNavigate({ from: Route.fullPath });

    const searchParameters :Record<string, unknown> = useSearch({strict: false});
	const redirect :string = searchParameters['redirect'] as string ?? "/";

    useEffect(() => { // only once..
        isUserAuthenticated() // If user is already authenticated it will be brought to home-page
		.then((authenticated) => {
			if (authenticated) {
				void navigate({ to: redirect });
			} 
		})
		.catch((error) => {
			console.error("Failed to check authentication:", error);
		});
    }, [redirect, navigate]);

	// State to hold form inputs
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	// State to handle errors
	const [error, setError] = useState<string>("");
	const [confirmSignUp, setConfirmSignUp] = useState<boolean>(false);

	// Handler for the sign-in function
	async function handleSignIn(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault(); // Prevent the form from submitting normally

		try {
			const { isSignedIn, nextStep } = await signIn({
				username: email,
				password: password,
			});
			console.log("Signed in:", isSignedIn);
			console.log("Next step:", nextStep);
			// Add any navigation or state updates here depending on 'nextStep' or 'isSignedIn'

			if (isSignedIn) {
				await navigate({to: redirect, search: { toastID: successToast.signIn } });
			} else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
				setConfirmSignUp(true);
			} else {
				setError("Sign in failed due to " + nextStep["signInStep"]);
			}
		} catch (error) {
			console.error("Error signing in:", error);
			if (typeof error === "string") {
				setError(error);
			} else if (error instanceof Error) {
				setError(error.message); // works, `e` narrowed to Error
			} else {
				setError("Unexpected error");
			}
			setPassword("");
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<a href="/">
						<h3 className="text-gray-600 text-3xl text-center">CRISP.NZ</h3>
					</a>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{error && (
						<div className="rounded-md bg-red-50 p-4">
							<div className="flex">
								<div className="flex-shrink-0">
									<XCircleIcon
										className="h-5 w-5 text-red-400"
										aria-hidden="true"
									/>
								</div>
								<div className="ml-3">
									<h3 className="text-sm font-medium text-red-800">
										Can't sign in
									</h3>
									<div className="mt-2 text-sm text-red-700">{error}</div>
								</div>
							</div>
						</div>
					)}

					{confirmSignUp ? (
						<UserConfirmForm email={email} redirect={redirect} />
					) : (
						<>
							<form className="space-y-6 pt-3" onSubmit={handleSignIn}>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Email address
									</label>
									<div className="mt-2">
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											value={email}
											onChange={(em) => {
												setEmail(em.target.value);
											}}
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Password
									</label>
									<div className="mt-2">
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											value={password}
											onChange={(pw) => {
												setPassword(pw.target.value);
											}}
										/>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Sign in
									</button>
								</div>
							</form>

							<p className="mt-10 text-center text-sm text-gray-500">
								Not a member?{" "}
								<a
									href="/sign-up"
									className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
								>
									Register for free
								</a>
							</p>
						</>
					)}
				</div>
			</div>
			<Toasts />
		</>
	);
};
