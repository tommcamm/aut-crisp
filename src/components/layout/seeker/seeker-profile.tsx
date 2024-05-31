import { FunctionComponent, useState, useEffect } from "react";
import { fetchCandidateUserData } from "../../../common/utils";

export const SeekerProfile: FunctionComponent = () => {
    const [name, setName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [dob, setDob] = useState<string>("");

    async function fetchData(): Promise<void> {
		const profile = await fetchCandidateUserData();
		setName(profile.name);
		setLastName(profile.lastName);
		setEmail(profile.email);
		setDob(profile.dob);
	}

    useEffect(() => {
		void fetchData();
	}, []);

    return(
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <div className="text-center">
                <div className="text-lg font-bold">Jobseeker: {name} {lastName}</div>
                <div className="text-gray-600">Date of birth: {dob}</div>
                <div className="text-gray-600">Email: {email}</div>
            </div>
        </div>
    )
};