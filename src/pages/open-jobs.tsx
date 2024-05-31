/* eslint-disable unicorn/consistent-function-scoping */
import type { FunctionComponent } from "../common/types";
import { Navbar } from "../components/layout/navbar";

import { SeekerOpenJobs } from "../components/layout/seeker/seeker-open-jobs";

export const OpenJobs = (): FunctionComponent => {
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar currentPage="open-jobs" />
			<SeekerOpenJobs />
		</div>
	);
};
