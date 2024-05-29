import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";

type JobApplication = {
  id: number;
  title: string;
  company: string;
  status: string;
  appliedDate: string;
};

const jobApplications: Array<JobApplication> = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Company A",
    status: "Interview Scheduled",
    appliedDate: "2024-05-10",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Company B",
    status: "Application Submitted",
    appliedDate: "2024-05-12",
  },
];


// TODO: Implement seeker dashboard

export const SeekerDashboard: FunctionComponent = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Job Applications</h1>
      <ul className="space-y-4">
        {jobApplications.map((job) => (
          <li key={job.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <BriefcaseIcon className="h-10 w-10 text-blue-600 mr-4" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">Applied on: {job.appliedDate}</p>
            </div>
            <span className="text-sm font-medium text-gray-700">{job.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
