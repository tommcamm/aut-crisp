/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-duplicate-imports */
import type React from "react";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import type { FunctionComponent } from "../common/types";
import { useState } from "react";
import PasswordStrengthBar from 'react-password-strength-bar';
import { signUp } from "aws-amplify/auth";
import { useNavigate  } from '@tanstack/react-router';


export const SignUpPage = (): FunctionComponent => {
    // State to hold form inputs
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    // State to handle errors
    const [error, setError] = useState<string>("");
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    const navigate = useNavigate({ from: '/sign-up' })

    async function handleSignUp(event: React.FormEvent<HTMLFormElement>) :Promise<void> {
        event.preventDefault(); 

        // Check if passwords match
        if (password === confirmPassword) {
            setPasswordsMatch(true);
            setError('');
        } else {
            setPasswordsMatch(false);
            setError('Passwords do not match');
            return;
        }
        
        // TODO: write the logic for sign up.
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
              username: email,
              password,
              options: {
                userAttributes: {
                  email
                },
                autoSignIn: true
              }
            });
        
            
            // User authenticated, redirect
            if (isSignUpComplete) {
                await navigate({to: '/', params: {fromSignUp: true} });
            }

          } catch (error) {
            console.log('error signing up', error);
            if (typeof error === "string") {
                setError(error);
            } else if (error instanceof Error) {
                setError(error.message); // works, `e` narrowed to Error
            } else {
                setError('Unexpected error');
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
                    Create your new account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Error while creating the account
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    {error}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <form className="space-y-6 pt-3" onSubmit={handleSignUp}>
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="yourUsername"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={username}
                                onChange={un => {setUsername(un.target.value)}}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                                onChange={em => {setEmail(em.target.value)}}
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                                onChange={pw => {setPassword(pw.target.value)}}
                            />
                            <PasswordStrengthBar password={password}/>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-10">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
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
                                onChange={cpw => {
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
            </div>
        </div>
    );
};
