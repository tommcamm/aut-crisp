import { CandidateProfile, Convert } from "../data/candidate-profile";
import { get, post, put } from "aws-amplify/api";

const baseUrl = "/candidates/profiles";

// Create a new profile
export async function createProfile(profile: CandidateProfile): Promise<void> {
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
	// Do nothing after profile is created
}

// Fetch all profiles
export async function fetchProfiles(): Promise<Array<CandidateProfile>> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toCandidateProfiles(await response.body.text());
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}

// Fetch a specific profile by ID
export async function fetchProfileById(id: string): Promise<CandidateProfile> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}/${id}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toCandidateProfile(
			await response.body.text()
		)[0] as CandidateProfile;
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}

// Update a profile
export async function updateProfile(
	profile: CandidateProfile
): Promise<CandidateProfile> {

	console.log("Profile to update:", profile);
	try {
		const restOperation = put({
			apiName: "crispApi",
			path: `${baseUrl}`,
			options: { body: profile as unknown as undefined},
		});
		const response = await restOperation.response;
		console.log("PUT call succeeded:", response);
		return Convert.toCandidateProfile(await response.body.text());
	} catch (error) {
		console.log("PUT call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}
