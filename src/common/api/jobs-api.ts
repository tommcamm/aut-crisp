import { get, post } from "aws-amplify/api";
import { Convert, Job } from "../data/job";
import { CandidateProfile } from "../data/candidate-profile";
import { fetchProfiles } from "./candidate-profiles-api"
import { fetchCandidateUserData } from "../utils"

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

// Fetch a specific Job by ID
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
		throw new Error("Failed to fetch jobs");
	}
}

//Create a job
export async function createJob(job: Job): Promise<void> {
	try {
		const inputId = crypto.randomUUID();
		job.id = inputId;

		const restOperation = post({
			apiName: "crispApi",
			path: `${baseUrl}`,
			options: { body: job as unknown as undefined},
		});
		const response = await restOperation.response;
		console.log("POST call succeeded:", response);
	} catch (error) {
		console.log("POST call failed:", error);
		throw new Error("Failed to fetch jobs");
	}
}

//Get all created jobs by the recruiter
export async function getAllCreatedJobs(): Promise<Array<Job>> {
	try {
		const profile: CandidateProfile = await fetchCandidateUserData();
		const jobs = await fetchJobs();

		const createdJobs = jobs.filter((job) => profile.id === job.rid);

		return createdJobs;
	} catch (error) {
		console.log("fetch call failed:", error);
		throw new Error("Failed to fetch jobs create");
	}
}

//Fetch all applicants by JobID
export async function fetchProfileByJobId(jobs: Array<Job>): Promise<Array<CandidateProfile>> {
	try {
	  const candidates = await fetchProfiles();
  
	  const filteredCandidates = candidates.filter((profile) => {
		return jobs.some((job) => profile.jobId.includes(job.id));
	  });
  
	  return filteredCandidates;
	} catch (error) {
	  console.log("GET call failed:", error);
	  throw new Error("Failed to fetch profiles");
	}
  }
