/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/consistent-function-scoping */
import { FunctionComponent, useEffect, useState } from 'react';
import { Job } from "../../../common/data/job"
import { getAllCreatedJobs, fetchProfileByJobId } from '../../../common/api/jobs-api';
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CandidateProfile } from '../../../common/data/candidate-profile';
import { fetchProfileById } from '../../../common/api/candidate-profiles-api';
import { getPublicResource } from '../../../common/utils';
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export const CandidateList: FunctionComponent = () => {
  const [createdJobs, setCreatedJobs] = useState<Array<Job>>([]);
  const [candidates, setCandidates] = useState<Array<CandidateProfile>>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
	const [selectedDetailedCandidate, setSelectedDetailedCandidate] = useState<CandidateProfile | null>(
		null
	);
  
  async function fetchData(): Promise<void> {
    const createdJobs = await getAllCreatedJobs();
    setCreatedJobs(createdJobs);
    const profiles = await fetchProfileByJobId(createdJobs);
    setCandidates(profiles);
  }

    useEffect(() => {
        void fetchData();
        console.log("createdJobs:", createdJobs);
    }, []);

    const openModal = async (candidate: CandidateProfile): Promise<void> => {
      setSelectedCandidate(candidate);
      const detail = await fetchProfileById(candidate.id);
      setSelectedDetailedCandidate(detail);
}

    const closeModal = (): void => {
      setSelectedCandidate(null);
      setSelectedDetailedCandidate(null);
    };

  return (
    <div className="w-full max-w-xl">
			<h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Applicants</h1>
			{candidates.map((candidate) => (
				<div key={candidate.id} className="mb-6">
					<li
								key={candidate.name}
								className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
								onClick={() => {
									openModal(candidate);
								}}
							>
								<div className="flex items-center">
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											{candidate.email}
										</h3>
									</div>
								</div>
								<ChevronRightIcon className="h-6 w-6 text-gray-400" />
							</li>
				</div>
			))}

			<Modal
				isOpen={!!selectedCandidate}
				onRequestClose={closeModal}
				contentLabel="Job Details"
				className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			>
				<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
					<p className="text-2xl font-bold mb-4">{selectedDetailedCandidate?.name} {selectedDetailedCandidate?.lastName}</p>
					<p className="text-gray-700 mb-4">
						Email: {selectedDetailedCandidate?.email}
					</p>
          <p className="text-gray-700 mb-4">
						Date of birth: {selectedDetailedCandidate?.dob}
					</p>
          <div><DocumentTextIcon className="h-12 w-12 text-gray-400" /> Download CV</div>
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