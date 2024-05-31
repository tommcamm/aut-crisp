import { FunctionComponent, useState, useEffect } from "react";
import { fetchRecruiterUserData } from "../../../common/utils";

export const RecruiterProfile: FunctionComponent = () => {
    const [name, setName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [organization, setOrganization] = useState<string>("");

    async function fetchData(): Promise<void> {
		const profile = await fetchRecruiterUserData();
		setName(profile.name);
		setLastName(profile.lastName);
		setEmail(profile.email);
		setOrganization(profile.organization);
	}

    useEffect(() => {
		void fetchData();
	}, []);

    return(
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <div className="text-center">
                <div className="text-lg font-bold">Recruiter: {name} {lastName}</div>
                <div className="text-gray-600">Works at: {organization}</div>
                <div className="text-gray-600">Email: {email}</div>
            </div>
        </div>
    )
};