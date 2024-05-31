import { getSignedInUserProperties } from "../common/api/auth-api";
import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

import { useEffect, useState } from "react";
import { SeekerProfile } from "../components/layout/seeker/seeker-profile";
import { RecruiterProfile } from "../components/layout/recruiter/recruiter-profile";

export const ProfilePage = (): FunctionComponent => {
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
			<Navbar currentPage="profile" />
			{userType === "Job Seeker" && <SeekerProfile />}
			{userType === "Recruiter" && <RecruiterProfile/> }
			<Footer />
		</div>
	);
};