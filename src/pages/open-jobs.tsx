import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

import { useEffect } from "react";
import { SeekerOpenJobs } from "../components/layout/seeker/seeker-open-jobs";

export const OpenJobs = (): FunctionComponent => {
	async function fetchData(): Promise<void> {
		// TODO: Job Fetch
	}

	useEffect(() => {
		void fetchData();
	}, []);
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar currentPage="open-jobs" />

			<SeekerOpenJobs />
			<Footer />
		</div>
	);
};
