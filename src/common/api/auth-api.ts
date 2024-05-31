/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { UpdatePasswordInput, fetchUserAttributes, getCurrentUser, updatePassword } from "aws-amplify/auth";

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
    id: string;
}

/**
 * Fetches properties of the signed-in user.
 * @returns A promise that resolves to an object containing user properties such as first name and last name.
 */
export async function getSignedInUserProperties(): Promise<UserAttributes> {
	try {
		const userAttributes = await fetchUserAttributes();

		return {
			email: userAttributes.email ?? "",
			picture: userAttributes.picture ?? "",
			userType: userAttributes["custom:userType"] ?? "",
            id: userAttributes.sub ?? ""
		};
	} catch (error) {
		console.error("Error fetching user details:", error);
		throw new Error("Unable to fetch user details");
	}
}


export async function handleUpdatePassword({
	oldPassword,
	newPassword
  }: UpdatePasswordInput) : Promise<void> {
	try {
	  await updatePassword({ oldPassword, newPassword });
	} catch (error) {
	  console.log("Can't change the password", error);
	  throw error;
	}
  }