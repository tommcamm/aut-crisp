import type { FunctionComponent } from "../common/types";
import BeatLoader  from "react-spinners/BeatLoader";
import { useEffect } from 'react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../routes/sign-out";

export const SignOutPage = (): FunctionComponent => {

    const navigate = useNavigate({ from: Route.fullPath });

    useEffect(() => {
        const performSignOut = async () :Promise<void> => {
            try {
                await signOut();
                setTimeout(() => {
                    void navigate({to: '/', search: {fromSignOut: true} });
                }, 1500);
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };

        void performSignOut();
    }, [navigate]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h3 className="text-gray-600 text-3xl text-center">CRISP.NZ</h3>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign out in progress
                </h2>
                <div className="flex justify-center py-6">
                    <BeatLoader color="#374151" speedMultiplier={0.6} />
                </div>
            </div>
        </div>
    );
}