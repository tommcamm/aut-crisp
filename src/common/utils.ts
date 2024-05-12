/* eslint-disable @typescript-eslint/restrict-template-expressions */
// File used for common functions to be used in component
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

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

interface UserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    // You can extend this interface with more attributes as needed.
}

/**
 * Fetches properties of the signed-in user.
 * @returns A promise that resolves to an object containing user properties such as first name and last name.
 */
export async function getSignedInUserProperties(): Promise<UserAttributes> {
    try {
        const userAttributes = await fetchUserAttributes();
        
        return {
            firstName: userAttributes.name ?? '',
            lastName: userAttributes.family_name ?? '',
            email: userAttributes.email ?? '',
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Unable to fetch user details');
    }

}
