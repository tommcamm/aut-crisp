import { CandidateList } from "./recruiter-seekers-list";
import { JobForm } from "../../forms/jobs/job-create";
import { CreatedJobsList } from "./recruiter-jobs-list";
import { FunctionComponent } from "react";

export const RecruiterDashboard: FunctionComponent = () => {

	return (
        <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-6 border-black border-2 rounded bg-white pt-12 pb-12">Recruiter Dashboard</h1>
        <div className="grid grid-cols-3 gap-4 ">
            <JobForm />
            <CreatedJobsList />
            <CandidateList  />
        </div>
        </div>
 )
		
};

