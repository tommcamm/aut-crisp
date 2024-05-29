/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { FunctionComponent } from "../../../common/types";
import {
    fetchCandidateUserData,
	getPublicResource,
	removePublicResource,
    uploadProfileVideo,
} from "../../../common/utils";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ReactPlayer from "react-player";


export const SeekerProfileVideo = (): FunctionComponent => {
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [successMsg, setSuccessMsg] = useState<boolean>(false);

	async function fetchData(): Promise<void> {
		const { videoUri } = await fetchCandidateUserData();
        setVideoUrl(videoUri === "" ? "" : await getPublicResource(videoUri));
	}

	async function handleVideoSave(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const file = formData.get("user-video") as File;

		if (videoUrl.match("toRemove")) {
			console.log("Removing video");
            const { videoUri } = await fetchCandidateUserData();
			await removePublicResource(videoUri);
			setSuccessMsg(true);
		} else if (file) {
			try {
				await uploadProfileVideo(file);
				console.log("Video upload done.");
				setSuccessMsg(true);
				void fetchData();
			} catch (error) {
				console.log("Video upload error:", error);
			}
		} else {
			console.log("No file selected.");
		}
	}

	const handleVideoChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = (): void => {
				setVideoUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		void fetchData();
	}, []);

	return (
		<section aria-labelledby="profile-settings">
			<form onSubmit={handleVideoSave}>
				<div className="shadow sm:rounded-md sm:overflow-hidden">
					<div className="bg-white py-6 px-4 sm:p-6">
						<div>
							<h2
								id="payment-details-heading"
								className="text-lg leading-6 font-medium text-gray-900"
							>
								Presentation video
							</h2>

							<p className="mt-1 text-sm text-gray-500">
								Upload your presentation video. This short video will be
								included with each application you do.
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
												Video updated successfully!
											</h3>
										</div>
									</div>
								</div>
							)}
							<div className="mt-1 flex items-center pt-3">
								<div className="">
									<ReactPlayer controls={true} url={videoUrl} width="20vw" height="20vh" />
								</div>
								<div className="ml-4 flex flex-col px-3">
									<div className="flex">
										<div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
											<label
												htmlFor="user-video"
												className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
											>
												<span>Change</span>
												<span className="sr-only"> user photo</span>
											</label>
											<input
												id="user-video"
												name="user-video"
												type="file"
												onChange={handleVideoChange}
												className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
											/>
										</div>
										<button
											type="button"
											className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
											onClick={() => {
												setVideoUrl("toRemove");
											}}
										>
											Remove
										</button>
									</div>
									<p className="mt-2 text-sm text-gray-500">
										MP4 format, max 50MB
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