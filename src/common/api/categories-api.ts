import { get } from "aws-amplify/api";
import { Category, Convert } from "../data/category";

const baseUrl = "/categories";

// Fetch all jobs
export async function fetchCategories(): Promise<Array<Category>> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toCategories(await response.body.text());
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}

// Fetch a specific profile by ID
export async function fetchCategoryById(id: string): Promise<Category> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}/${id}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toCategory(await response.body.text());
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}
