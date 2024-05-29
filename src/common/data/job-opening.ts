import { Category } from "./category";
import { Job } from "./job";

export type ShortJob = {
	id: string;
	title: string;
};

export type JobCategory = {
	id: string;
	name: string;
	jobs: Array<ShortJob>;
};

export function mergeCategoriesAndJobs(
	categories: Array<Category>,
	jobs: Array<Job>
): Array<JobCategory> {
	// Create a map to group jobs by categoryId
	const jobsByCategoryId: { [key: string]: Array<ShortJob> } = {};

	jobs.forEach((job) => {
		if (!jobsByCategoryId[job.categoryId]) {
			jobsByCategoryId[job.categoryId] = [];
		}
		jobsByCategoryId[job.categoryId]?.push({ id: job.id, title: job.title });
	});

	// Map categories to JobCategory structure
	const jobCategories: Array<JobCategory> = categories.map((category) => ({
		id: category.id,
		name: category.description,
		jobs: jobsByCategoryId[category.id] || [],
	}));

	return jobCategories;
}
