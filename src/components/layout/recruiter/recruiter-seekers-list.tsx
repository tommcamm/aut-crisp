import { FunctionComponent, useEffect, useState } from 'react';
import { Job } from "../../../common/data/job"
import { getAllCreatedJobs, fetchProfileByJobId } from '../../../common/api/jobs-api';

interface Candidate {
    id: string; 
    name: string;
    email: string;
    // add other fields as necessary
  }

export const CandidateList: FunctionComponent = () => {
  const [createdJobs, setCreatedJobs] = useState<Array<Job>>([]);
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  
  async function fetchData(): Promise<void> {
    const createdJobs = await getAllCreatedJobs();
    setCreatedJobs(createdJobs);
    const profiles = await fetchProfileByJobId(createdJobs);
    setCandidates(profiles);
  }

    useEffect(() => {
        void fetchData();
    }, []);

  return (
    <div className="flex flex-col items-center h-screen ">
    <div className="w-full max-w-xl">
    <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Applicants list</h1>
        <div className="overflow-y-auto h-96">
        {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white shadow-md rounded px-4 py-6 mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{candidate.name}</h2>
            <p>{candidate.email}</p>
            {/* add other fields as necessary */}
            </div>
        ))}
        </div>
    </div>
    {createdJobs.map(() => ( <div></div>))}
    </div>
  );
};