/* eslint-disable unicorn/consistent-function-scoping */
import { BriefcaseIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useEffect, useState } from "react";
import { getAvailableJobs } from "../../../common/utils";
import { JobCategory } from "../../../common/data/job-opening";

export const SeekerOpenJobs: FunctionComponent = () => {
	const [jobCategories, setJobCategories] = useState<Array<JobCategory>>([]);

	async function fetchData(): Promise<void> {
		setJobCategories(await getAvailableJobs());
	}

	useEffect(() => {
		void fetchData();
	}, []);

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">
				Open Job Positions
			</h1>
			{jobCategories.map((category) => (
				<div key={category.id} className="mb-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						{category.name}
					</h2>
					<ul className="space-y-4">
						{category.jobs.map((job) => (
							<li
								key={job.id}
								className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
							>
								<div className="flex items-center">
									<BriefcaseIcon className="h-10 w-10 text-blue-600 mr-4" />
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											{job.title}
										</h3>
									</div>
								</div>
								<ChevronRightIcon className="h-6 w-6 text-gray-400" />
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};
