/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

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
    userType: string;
    email: string;
    picture: string;
}

/**
 * Fetches properties of the signed-in user.
 * @returns A promise that resolves to an object containing user properties such as first name and last name.
 */
export async function getSignedInUserProperties(): Promise<UserAttributes> {
    try {
        const userAttributes = await fetchUserAttributes();
        
        return {
            email: userAttributes.email ?? '',
            picture: userAttributes.picture ?? '',
            userType: userAttributes['custom:userType'] ?? '',

        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Unable to fetch user details');
    }

}

// Helper function to fetch tokens
export async function getAuthHeaders(): Promise<HeadersInit> {
    try {
      const authSession = await fetchAuthSession();
      const { accessToken } = authSession.tokens ?? {};
      return { 'Authorization': `Bearer ${accessToken}` };
    } catch (error) {
      console.error('Failed to fetch auth session:', error);
      throw new Error('Authentication failed');
    }
  }