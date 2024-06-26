/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import type { FunctionComponent } from "../../../common/types";
import { fetchCandidateUserData } from "../../../common/utils";
import { updateProfile } from "../../../common/api/candidate-profiles-api";


export const SeekerProfileSettingsForm = (): FunctionComponent => {
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

	async function handleProfileSave(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		const profile = await fetchCandidateUserData();
		profile.name = name;
		profile.lastName = lastName;
		profile.dob = dob;

		await updateProfile(profile);
	}

	useEffect(() => {
		void fetchData();
	}, []);

	return (
		<section aria-labelledby="profile-settings">
			<form onSubmit={handleProfileSave}>
				<div className="shadow sm:rounded-md sm:overflow-hidden">
					<div className="bg-white py-6 px-4 sm:p-6">
						<div>
							<h2
								id="payment-details-heading"
								className="text-lg leading-6 font-medium text-gray-900"
							>
								Profile details
							</h2>
							<p className="mt-1 text-sm text-gray-500">
								Update your profile information. Please note that this details
								will be shared with the recruiters.
							</p>
						</div>

						<div className="mt-6 grid grid-cols-4 gap-6">
							<div className="col-span-4 sm:col-span-2">
								<label
									htmlFor="first-name"
									className="block text-sm font-medium text-gray-700"
								>
									First name
								</label>
								<input
									type="text"
									name="first-name"
									id="first-name"
									value={name}
									onChange={(name) => {
										setName(name.target.value);
									}}
									autoComplete="cc-given-name"
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
								/>
							</div>

							<div className="col-span-4 sm:col-span-2">
								<label
									htmlFor="last-name"
									className="block text-sm font-medium text-gray-700"
								>
									Last name
								</label>
								<input
									type="text"
									name="last-name"
									id="last-name"
									value={lastName}
									onChange={(lastName) => {
										setLastName(lastName.target.value);
									}}
									autoComplete="cc-family-name"
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
								/>
							</div>

							<div className="col-span-4 sm:col-span-2">
								<label
									htmlFor="email-address"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<input
									type="text"
									disabled={true}
									name="email-address"
									id="email-address"
									value={email}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
								/>
							</div>

							<div className="col-span-4 sm:col-span-1">
								<label
									htmlFor="date-of-birth"
									className="flex items-center text-sm font-medium text-gray-700"
								>
									<span>Date of Birth</span>
								</label>
								<input
									type="date"
									name="date-of-birth"
									id="date-of-birth"
									autoComplete="date-of-birth"
									value={dob}
									onChange={(newDob) => {
										setDob(newDob.target.value);
									}}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
								/>
							</div>
						</div>
					</div>
					<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
						<button
							type="submit"
							className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};
