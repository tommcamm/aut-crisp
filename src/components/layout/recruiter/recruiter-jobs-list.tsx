import { FunctionComponent, useEffect, useState } from 'react';
import { getAllCreatedJobs } from '../../../common/api/jobs-api';


interface CreatedJobs {
    id: string,
    title: string,
    description: string,
    salary: string,
    categoryId: string,
    // add other fields as necessary
  }

export const CreatedJobsList: FunctionComponent = () => {
  const [createdJobs, setCreatedJobs] = useState<Array<CreatedJobs>>([]);
  
    async function fetchData(): Promise<void> {
        const createdJobs = await getAllCreatedJobs();
        setCreatedJobs(createdJobs);
    }

    useEffect(() => {
        void fetchData();
    }, []);


  return (
    <div className="flex flex-col items-center h-screen">
    <div className="w-full max-w-xl">
    <h1 className="text-3xl text-center mb-4">Created jobs list</h1>
        <div className="overflow-y-auto h-96">
        {createdJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded px-4 py-6 mb-4 text-center">
            <h2 className="text-xl">{job.title}</h2>
            {/* add other fields as necessary */}
            </div>
        ))}
        </div>
    </div>
    </div>
  );
};