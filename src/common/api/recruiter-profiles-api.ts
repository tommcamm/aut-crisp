// TODO: Implement API logic to connect with recruiterProfiles Table.

import { get, post, put } from "aws-amplify/api";
import { Convert, RecruiterProfile } from "../data/recruiter-profile";

const baseUrl = "/recruiters/profiles";

export async function createRecruiterProfile(profile: RecruiterProfile): Promise<void> {
    try {
		const restOperation = post({
			apiName: "crispApi",
			path: `${baseUrl}`,
			options: { body: profile as unknown as undefined},
		});
		const response = await restOperation.response;
		console.log("POST call succeeded:", response);
	} catch (error) {
		console.log("POST call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}

// Fetch all profiles
export async function fetchRecruiterProfiles(): Promise<Array<RecruiterProfile>> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toRecruiterProfiles(await response.body.text());
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}


// Fetch a specific profile by ID
export async function fetchRecruiterProfileById(id: string): Promise<RecruiterProfile> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}/${id}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toRecruiterProfiles(
			await response.body.text()
		)[0] as RecruiterProfile;
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}

// Update a profile
export async function updateRecruiterProfile(
	profile: RecruiterProfile
): Promise<RecruiterProfile> {

	console.log("Profile to update:", profile);
	try {
		const restOperation = put({
			apiName: "crispApi",
			path: `${baseUrl}`,
			options: { body: profile as unknown as undefined},
		});
		const response = await restOperation.response;
		console.log("PUT call succeeded:", response);
		return Convert.toRecruiterProfile(await response.body.text());
	} catch (error) {
		console.log("PUT call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}