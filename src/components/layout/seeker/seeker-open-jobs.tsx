/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/consistent-function-scoping */
import { BriefcaseIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useEffect, useState } from "react";
import { applyToJob, getAvailableJobs } from "../../../common/utils";
import { JobCategory, ShortJob } from "../../../common/data/job-opening";
import { Job } from "../../../common/data/job";
import { fetchJobById } from "../../../common/api/jobs-api";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";

export const SeekerOpenJobs: FunctionComponent = () => {
	const [jobCategories, setJobCategories] = useState<Array<JobCategory>>([]);
	const [selectedJob, setSelectedJob] = useState<ShortJob | null>(null);
	const [selectedDetailedJob, setSelectedDetailedJob] = useState<Job | null>(
		null
	);

	async function fetchData(): Promise<void> {
		setJobCategories(await getAvailableJobs());
	}

	useEffect(() => {
		void fetchData();
	}, []);

	const openModal = async (job: ShortJob): Promise<void> => {
		setSelectedJob(job);
		const detail = await fetchJobById(job.id);
		setSelectedDetailedJob(detail);
	};

	const applyForJob = async (): Promise<void> => {
		await applyToJob(selectedJob?.id ?? "");

		// Same as close modal
		setSelectedJob(null);
		setSelectedDetailedJob(null);
		await fetchData();
		toast.success("Application sent successfully");
	};

	const closeModal = (): void => {
		setSelectedJob(null);
		setSelectedDetailedJob(null);
	};

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">
				Open Job Positions
			</h1>
			{jobCategories.map(
				(category) =>
					category.jobs.length > 0 && (
						<div key={category.id} className="mb-6">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								{category.name}
							</h2>
							<ul className="space-y-4">
								{category.jobs.map((job) => (
									<li
										key={job.id}
										className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
										onClick={() => {
											openModal(job);
										}}
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
					)
			)}

			<Modal
				isOpen={!!selectedJob}
				onRequestClose={closeModal}
				contentLabel="Job Details"
				className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			>
				<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
					<h2 className="text-2xl font-bold mb-4">{selectedJob?.title}</h2>
					<p className="text-gray-700 mb-4">
						{selectedDetailedJob?.description}
					</p>
					<p className="text-gray-700 mb-4">
						Salary: {selectedDetailedJob?.salary}
					</p>
					<div className="flex justify-end space-x-4">
						<button
							onClick={closeModal}
							className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
						>
							Close
						</button>
						<button
							onClick={applyForJob}
							className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
						>
							Apply
						</button>
					</div>
				</div>
			</Modal>
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
};
