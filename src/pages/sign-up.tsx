/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-duplicate-imports */
import type React from "react";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import type { FunctionComponent } from "../common/types";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "@tanstack/react-router";
import { UserConfirmForm } from "../components/forms/user-confirm";
import { confirmType, successToast } from "../common/enums";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { isUserAuthenticated } from "../common/api/auth-api";
import { classNames } from "../common/utils";

const userTypes = [
    { id: 1, title: 'Job Seeker', description: 'Browse thousands of job openings tailored to you'},
    { id: 2, title: 'Recruiter', description: 'Find the perfect candidate for your company'},
]

export const SignUpPage = (): FunctionComponent => {
	const navigate = useNavigate({ from: "/sign-up" });

	isUserAuthenticated() // If user is already authenticated it will be brought to home-page
		.then((authenticated) => {
			if (authenticated) {
				void navigate({ to: "/" });
			}
		})
		.catch((error) => {
			console.error("Failed to check authentication:", error);
		});

	// State to hold form inputs
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [selectedUserType, setSelectedUserType] = useState(userTypes[0])


	// State to handle errors
	const [error, setError] = useState<string>("");
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

	const [confirmSignUp, setConfirmSignUp] = useState<boolean>(false);

	async function handleSignUp(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		// Check if passwords match
		if (password === confirmPassword) {
			setPasswordsMatch(true);
			setError("");
		} else {
			setPasswordsMatch(false);
			setError("Passwords do not match");
			return;
		}

		try {
			const { isSignUpComplete, nextStep } = await signUp({
				username: email,
				password,
				options: {
					userAttributes: {
						email,
						picture: " ",
						"custom:userType": selectedUserType?.title,
					},
					autoSignIn: true,
				},
			});

			console.log("Sign up complete?", isSignUpComplete);
			console.log("Next step:", nextStep);

			// User authenticated, confirmation stage then redirect
			if (isSignUpComplete) {
				await navigate({ to: "/", search: { toastID: successToast.signUp } });
			} else if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
				setConfirmSignUp(true);
			}
		} catch (error) {
			console.log("error signing up", error);
			if (typeof error === "string") {
				setError(error);
			} else if (error instanceof Error) {
				setError(error.message); // works, `e` narrowed to Error
			} else {
				setError("Unexpected error");
			}
		}
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<a href="/">
					<h3 className="text-gray-600 text-3xl text-center">CRISP.NZ</h3>
				</a>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Create a new account
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
									Error while creating the account
								</h3>
								<div className="mt-2 text-sm text-red-700">{error}</div>
							</div>
						</div>
					</div>
				)}

				{confirmSignUp ? (
					<UserConfirmForm
						email={email}
						type={confirmType.signUp}
						redirect="/"
					/>
				) : (
					<form className="space-y-6 pt-3" onSubmit={handleSignUp}>
						{/* Email */}
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
									placeholder="name@example.com"
									required
									className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={email}
									onChange={(em) => {
										setEmail(em.target.value);
									}}
								/>
							</div>
						</div>
						{/* Password */}
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
								<PasswordStrengthBar password={password} />
							</div>
						</div>

						{/* Confirm Password */}
						<div className="mt-10">
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirm Password
							</label>
							<div className="mt-2">
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									required
									className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={confirmPassword}
									onChange={(cpw) => {
										setConfirmPassword(cpw.target.value);
										if (password === cpw.target.value) {
											setPasswordsMatch(true);
										} else {
											setPasswordsMatch(false);
										}
									}}
								/>
								{!passwordsMatch && (
									<p className="mt-2 text-sm text-red-600">
										The passwords must be the same.
									</p>
								)}
							</div>
						</div>
                        
						{/* User type */}
						<RadioGroup value={selectedUserType} onChange={setSelectedUserType}>
							<RadioGroup.Label className="text-sm font-medium text-gray-900">
								Select a user type
							</RadioGroup.Label>

							<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
								{userTypes.map((userType) => (
									<RadioGroup.Option
										key={userType.id}
										value={userType}
										className={({ checked, active }) =>
											classNames(
												checked ? "border-transparent" : "border-gray-300",
												active ? "ring-2 ring-indigo-500" : "",
												"relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
											)
										}
									>
										{({ checked, active }) => (
											<>
												<div className="flex-1 flex">
													<div className="flex flex-col">
														<RadioGroup.Label
															as="span"
															className="block text-sm font-medium text-gray-900"
														>
															{userType.title}
														</RadioGroup.Label>
														<RadioGroup.Description
															as="span"
															className="mt-1 flex items-center text-sm text-gray-500"
														>
															{userType.description}
														</RadioGroup.Description>
													</div>
												</div>
												<CheckCircleIcon
													className={classNames(
														checked ? "" : "invisible",
														"h-5 w-5 text-indigo-600"
													)}
													aria-hidden="true"
												/>
												<div
													className={classNames(
														active ? "border" : "border-2",
														checked
															? "border-indigo-500"
															: "border-transparent",
														"absolute -inset-px rounded-lg pointer-events-none"
													)}
													aria-hidden="true"
												/>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>

						{/* Submit Button */}
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign up
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};
