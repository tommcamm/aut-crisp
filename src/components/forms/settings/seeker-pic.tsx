/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { FunctionComponent } from "../../../common/types";
import {
	getDefaultProfilePicUrl,
	getProfilePicUrl,
	removeProfilePic,
	uploadProfilePic,
} from "../../../common/utils";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const SeekerProfilePic = (): FunctionComponent => {
	const [picUrl, setPicUrl] = useState<string>("");
	const [successMsg, setSuccessMsg] = useState<boolean>(false);

	async function fetchData(): Promise<void> {
		const defaultUrl = await getDefaultProfilePicUrl();
		const picUrl = await getProfilePicUrl();

		setPicUrl(picUrl === "" ? defaultUrl : picUrl);
	}

	async function handlePicSave(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const file = formData.get("user-photo") as File;

		if (picUrl.match("api.dicebear.com")) {
			console.log("Default pic, deleting current pic.");
			await removeProfilePic();
			setSuccessMsg(true);
		} else if (file) {
			try {
				await uploadProfilePic(file);
				console.log("PIC upload done.");
				setSuccessMsg(true);
				void fetchData();
			} catch (error) {
				console.log("PIC upload error:", error);
			}
		} else {
			console.log("No file selected.");
		}
	}

	const handlePicChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = (): void => {
				setPicUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		void fetchData();
	}, []);

	return (
		<section aria-labelledby="profile-settings">
			<form onSubmit={handlePicSave}>
				<div className="shadow sm:rounded-md sm:overflow-hidden">
					<div className="bg-white py-6 px-4 sm:p-6">
						<div>
							<h2
								id="payment-details-heading"
								className="text-lg leading-6 font-medium text-gray-900"
							>
								Profile picture
							</h2>

							<p className="mt-1 text-sm text-gray-500">
								Update your profile picture. This picture will be visible by
								recruiters each time you apply for a job.
							</p>
						</div>

						<div className="sm:col-span-6 py-3">
							{successMsg && (
								<div className="rounded-md bg-green-50 p-4">
									<div className="flex">
										<div className="flex-shrink-0">
											<CheckCircleIcon
												className="h-5 w-5 text-green-400"
												aria-hidden="true"
											/>
										</div>
										<div className="ml-3">
											<h3 className="text-sm font-medium text-green-800">
												Profile picture updated successfully!
											</h3>
										</div>
									</div>
								</div>
							)}
							<div className="mt-1 flex items-center pt-3">
								<img
									className="inline-block h-24 w-24 rounded-md"
									src={picUrl}
									alt=""
								/>
								<div className="ml-4 flex flex-col px-3">
									<div className="flex">
										<div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
											<label
												htmlFor="user-photo"
												className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
											>
												<span>Change</span>
												<span className="sr-only"> user photo</span>
											</label>
											<input
												id="user-photo"
												name="user-photo"
												type="file"
												onChange={handlePicChange}
												className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
											/>
										</div>
										<button
											type="button"
											className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
											onClick={async () => {
												setPicUrl(await getDefaultProfilePicUrl());
											}}
										>
											Remove
										</button>
									</div>
									<p className="mt-2 text-sm text-gray-500">
										JPG, GIF or PNG. 1MB max.
									</p>
								</div>
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
