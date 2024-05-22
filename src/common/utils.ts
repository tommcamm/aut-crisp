/* eslint-disable unicorn/prevent-abbreviations */
import { getSignedInUserProperties } from "./api/auth-api";
import { createProfile, fetchProfileById } from "./api/candidate-profiles-api";
import { CandidateProfile } from "./data/candidate-profile";

// File used for common functions to be used in component
export function classNames(...classes: Array<string>): string {
	return classes.filter(Boolean).join(" ");
}

export async function fetchCandidateUserData(): Promise<CandidateProfile> {
	// First step is to check if the user is currently present in the db
	// If not, create a new profile for the user
	const { id, email } = await getSignedInUserProperties();
	const currProfile = await fetchProfileById(id);

    console.log("Current profile:",currProfile);

	if ((Array.isArray(currProfile) && currProfile.length === 0) || currProfile === undefined) {
		console.log("Profile not found, creating a new profile for the user");
		const newProfile: CandidateProfile = {
			email,
			cvUri: "",
			dob: "",
			id,
			jobId: [],
			lastName: "",
			name: "",
			videoUri: "",
		};
		await createProfile(newProfile);
        return newProfile;
	}
    return currProfile;
}
