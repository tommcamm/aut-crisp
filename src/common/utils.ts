/* eslint-disable unicorn/prevent-abbreviations */
import { getSignedInUserProperties } from "./api/auth-api";
import {
	createProfile,
	fetchProfileById,
	updateProfile,
} from "./api/candidate-profiles-api";
import { CandidateProfile } from "./data/candidate-profile";
import { getUrl, remove, uploadData } from "aws-amplify/storage";

// File used for common functions to be used in component
export function classNames(...classes: Array<string>): string {
	return classes.filter(Boolean).join(" ");
}

export async function fetchCandidateUserData(): Promise<CandidateProfile> {
	// First step is to check if the user is currently present in the db
	// If not, create a new profile for the user
	const { id, email } = await getSignedInUserProperties();
	const currProfile = await fetchProfileById(id);

	console.log("Current profile:", currProfile);

	if (
		(Array.isArray(currProfile) && currProfile.length === 0) ||
		currProfile === undefined
	) {
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

export async function uploadProfilePic(file: File): Promise<void> {
	try {
		const result = await uploadData({
			path: ({ identityId }) => `public/profilePics/${identityId}.jpg`,
			data: file,
		}).result;
		console.log("PIC upload Succeeded:", result);
	} catch (error) {
		console.log("PIC uplaod Error :", error);
	}
}

export async function getProfilePicUrl(): Promise<string> {
	try {
		const getUrlResult = await getUrl({
			path: ({ identityId }) => `public/profilePics/${identityId}.jpg`,
			options: {
				validateObjectExistence: true, // Check if object exists before creating a URL
			},
		});
		console.log("signed URL:", getUrlResult.url);
		return getUrlResult.url.href;
	} catch (error) {
		if (error instanceof Error && error.name === "NotFound") {
			console.log("No profile pic found");
			return "";
		} else {
			throw error;
		}
	}
}

export async function getDefaultProfilePicUrl(): Promise<string> {
	const { name } = await fetchCandidateUserData();

	return `https://api.dicebear.com/8.x/initials/svg?seed=${name}`;
}

export async function removeProfilePic(): Promise<void> {
	try {
		await remove({
			path: ({ identityId }) => `public/profilePics/${identityId}.jpg`,
		});
	} catch (error) {
		console.log("Error removing pic:", error);
	}
}

export async function uploadProfileVideo(file: File): Promise<void> {
	const profile = await fetchCandidateUserData();
	const s3path = `public/profileVideos/${profile.videoUri === "" ? crypto.randomUUID() : profile.videoUri}.mp4`;
	try {
		const result = await uploadData({
			path: s3path,
			data: file,
		}).result;
		console.log("Video upload Succeeded:", result);

		// Updating the profile dataset with additional info
		if (profile.videoUri === "") {
			profile.videoUri = s3path;
			await updateProfile(profile);
		}

		console.log("Profile updated with video URI");
	} catch (error) {
		console.log("Video uplaod Error :", error);
		throw new Error("Error uploading video");
	}
}

export async function getPublicResource(s3url: string): Promise<string> {
	try {
		const getUrlResult = await getUrl({
			path: s3url,
			options: {
				validateObjectExistence: true, // Check if object exists before creating a URL
			},
		});
		console.log("signed URL:", getUrlResult.url);
		return getUrlResult.url.href;
	} catch (error) {
		if (error instanceof Error && error.name === "NotFound") {
			console.log("File not found");
			throw error;
		} else {
			throw error;
		}
	}
}

export async function removePublicResource(s3url: string): Promise<void> {
	try {
		await remove({
			path: s3url,
		});
	} catch (error) {
		console.log("Error removing pic:", error);
	}
}

// CV

export async function uploadProfileCv(file: File): Promise<void> {
	const profile = await fetchCandidateUserData();
	const s3path = `public/profileCvs/${profile.cvUri === "" ? crypto.randomUUID() : profile.cvUri}.pdf`;
	try {
		const result = await uploadData({
			path: s3path,
			data: file,
		}).result;
		console.log("CV upload Succeeded:", result);

		// Updating the profile dataset with additional info
		if (profile.cvUri === "") {
			profile.cvUri = s3path;
			await updateProfile(profile);
		}

		console.log("Profile updated with CV URI");
	} catch (error) {
		console.log("CV uplaod Error :", error);
		throw new Error("Error uploading video");
	}
}
