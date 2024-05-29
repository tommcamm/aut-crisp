import React, { useEffect, useState } from 'react';
import { fetchProfiles } from '../../../common/api/candidate-profiles-api';

interface Candidate {
    id: string; 
    name: string;
    email: string;
    // add other fields as necessary
  }

export const CandidateList: React.FunctionComponent = () => {
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  
  async function fetchData(): Promise<void> {
    const profiles = await fetchProfiles();
    setCandidates(profiles);
    }

    useEffect(() => {
        void fetchData();
    }, []);

  return (
    <div className="flex flex-col items-center h-screen">
    <div className="w-full max-w-xl">
    <h1 className="text-3xl text-center mb-4">Candidates list</h1>
        <div className="overflow-y-auto h-96">
        {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white shadow-md rounded px-4 py-6 mb-4 text-center">
            <h2 className="text-xl">{candidate.name}</h2>
            <p>{candidate.email}</p>
            {/* add other fields as necessary */}
            </div>
        ))}
        </div>
    </div>
    </div>
  );
};