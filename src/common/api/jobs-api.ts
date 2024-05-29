import { get } from "aws-amplify/api";
import { Convert, Job } from "../data/job";

const baseUrl = "/jobs";

// Fetch all jobs
export async function fetchJobs(): Promise<Array<Job>> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toJobs(await response.body.text());
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}

// Fetch a specific profile by ID
export async function fetchJobById(id: string): Promise<Job> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}/${id}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toJobs(await response.body.text())[0] as Job;
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}
