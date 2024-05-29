import { getSignedInUserProperties } from "../common/api/auth-api";
import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

import { useEffect, useState } from "react";
import { SeekerDashboard } from "../components/layout/seeker/seeker-dashboard";
import { RecruiterDashboard } from "../components/layout/recruiter/recruiter-dashboard";

export const Dashboard = (): FunctionComponent => {
	const [userType, setUserType] = useState<string>("");

	async function fetchData(): Promise<void> {
		const { userType } = await getSignedInUserProperties();
		setUserType(userType);
	}

	useEffect(() => {
		void fetchData();
	}, []);
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar currentPage="dashboard" />
			{userType === "Job Seeker" && <SeekerDashboard />}
			{userType === "Recruiter" && <RecruiterDashboard/> }
			<Footer />
		</div>
	);
};
