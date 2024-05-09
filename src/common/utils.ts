// File used for common functions to be used in component

import { getCurrentUser } from "aws-amplify/auth";

export function classNames(...classes: Array<string>) :string {
    return classes.filter(Boolean).join(' ')
}

/**
 * Checks if the user is currently authenticated.
 * @returns Promise that resolves to true if the user is authenticated, otherwise false.
 */
export async function isUserAuthenticated(): Promise<boolean> {
    try {
        await getCurrentUser();
        return true;
    } catch {
        return false;
    }
}