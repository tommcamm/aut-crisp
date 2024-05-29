/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { BriefcaseIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useEffect, useState } from "react";
import { JobCategory, ShortJob } from "../../../common/data/job-opening";
import { getAllAppliedJobs, removeApplicationToJob } from "../../../common/utils";
import Modal from "react-modal";
import { Job } from "../../../common/data/job";
import { fetchJobById } from "../../../common/api/jobs-api";
import { toast, ToastContainer } from "react-toastify";

export const SeekerDashboard: FunctionComponent = () => {
	const [jobCategories, setJobCategories] = useState<Array<JobCategory>>([]);
	const [selectedJob, setSelectedJob] = useState<ShortJob | null>(null);
	const [selectedDetailedJob, setSelectedDetailedJob] = useState<Job | null>(
		null
	);

	async function fetchData(): Promise<void> {
		setJobCategories(await getAllAppliedJobs());
	}

	const openModal = async (job: ShortJob): Promise<void> => {
		setSelectedJob(job);
		const detail = await fetchJobById(job.id);
		setSelectedDetailedJob(detail);
	};

	const removeApplication = async (): Promise<void> => {
		await removeApplicationToJob(selectedJob?.id ?? '');

		// Same as close modal
		setSelectedJob(null);
		setSelectedDetailedJob(null);
    await fetchData();
    toast.success("Application removed successfully");
	};

	const closeModal = (): void => {
		setSelectedJob(null);
		setSelectedDetailedJob(null);
	};

	useEffect(() => {
		void fetchData();
	}, []);
	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">
				My Job Applications
			</h1>
			{jobCategories.map(
				(category) =>
					category.jobs.length > 0 && ( // filter categories with 0 jobs
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
										<span className="text-sm font-medium text-gray-700">
											Application sent
										</span>
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
					<div className="rounded-md bg-green-50 p-4">
						<div className="flex">
							<div className="flex-shrink-0">
								<CheckCircleIcon
									className="h-5 w-5 text-green-400"
									aria-hidden="true"
								/>
							</div>
							<div className="ml-3">
								<h3 className="text-sm font-medium text-green-800">
									Application sent successfully!
								</h3>
							</div>
						</div>
					</div>
					<p className="text-gray-700 mb-4 pt-3">
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
							onClick={removeApplication}
							className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
						>
							Delete application
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
				theme="light" />
		</div>
	);
};
