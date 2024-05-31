/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/consistent-function-scoping */
import { FunctionComponent, useEffect, useState } from 'react';
import { getAllCreatedJobs, fetchJobById } from '../../../common/api/jobs-api';
import { Job } from "../../../common/data/job";
import { ShortJob } from "../../../common/data/job-opening";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { BriefcaseIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CreatedJob {
    id: string,
    title: string,
    description: string,
    salary: string,
    categoryId: string,
    // add other fields as necessary
  }

export const CreatedJobsList: FunctionComponent = () => {
  const [createdJobs, setCreatedJobs] = useState<Array<CreatedJob>>([]);
  const [selectedJob, setSelectedJob] = useState<ShortJob | null>(null);
	const [selectedDetailedJob, setSelectedDetailedJob] = useState<Job | null>(
		null
	);

    async function fetchData(): Promise<void> {
        const createdJobs = await getAllCreatedJobs();
        setCreatedJobs(createdJobs);
    }

    useEffect(() => {
        void fetchData();
    }, []);

  const openModal = async (job: ShortJob): Promise<void> => {
        setSelectedJob(job);
        const detail = await fetchJobById(job.id);
        setSelectedDetailedJob(detail);
  }

  // const deleteCreatedJob = async (): Promise<void> => {
  //       await deleteJob(selectedJob?.id ?? '');

  //       // Same as close modal
  //       setSelectedJob(null);
  //       setSelectedDetailedJob(null);
  //       await fetchData();
  //       toast.success("Job deleted successfully");
	// };

  const closeModal = (): void => {
		setSelectedJob(null);
		setSelectedDetailedJob(null);
	};

  return (
    <div className="w-full max-w-xl">
			<h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Created jobs list</h1>
			{createdJobs.map((job) => (
				<div key={job.id} className="mb-6">
					<li
								key={job.title}
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
				</div>
			))}

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
						{/* <button
							onClick= {deleteCreatedJob}
							className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
						>
							Delete
						</button> */}
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