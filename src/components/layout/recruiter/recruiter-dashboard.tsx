import { CandidateList } from "./recruiter-seekers-list";
import { JobForm } from "../../forms/jobs/job-create";
import { CreatedJobsList } from "./recruiter-jobs-list";
import { FunctionComponent, useEffect, useState } from "react";

export const RecruiterDashboard: FunctionComponent = () => {

	return (
        <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-3 gap-4 ">
            <JobForm />
            <CreatedJobsList />
            <CandidateList  />
        </div>
        </div>
 )
		
};

