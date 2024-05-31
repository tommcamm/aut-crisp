/* eslint-disable unicorn/prevent-abbreviations */
import { BellIcon, KeyIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { SeekerProfileSettingsForm } from "../components/forms/settings/seeker-profile";
import { classNames } from "../common/utils";
import { SeekerProfilePic } from "../components/forms/settings/seeker-pic";
import { SeekerProfileVideo } from "../components/forms/settings/seeker-video";
import { SeekerProfileCv } from "../components/forms/settings/seeker-cv";
import { useEffect, useState } from "react";
import { getSignedInUserProperties } from "../common/api/auth-api";
import SyncLoader from "react-spinners/SyncLoader";
import { RecruiterProfileSettingsForm } from "../components/forms/settings/recruiter-profile";
import { ChangePasswordForm } from "../components/forms/settings/password-change";

const subNavigation = [
	{ name: "Profile", href: "profile", icon: UserCircleIcon, current: true },
	{ name: "Password", href: "password", icon: KeyIcon, current: false },
	{
		name: "Notifications",
		href: "notification",
		icon: BellIcon,
		current: false,
	},
];

export const SettingsPage = (): FunctionComponent => {
	const [userType, setUserType] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<string>("profile");

	async function fetchData(): Promise<void> {
		const { userType } = await getSignedInUserProperties();
		setUserType(userType);
	}

	useEffect(() => {
		void fetchData();
	}, []);

	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8 mb-auto">
				<div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
					<aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
						<nav className="space-y-1 cursor-pointer">
							{subNavigation.map((item) => (
								<a
									key={item.name}
									onClick={() => {
										const selectedItem = subNavigation.find(
											(item) => item.current === true
										);
										if (selectedItem) {
											selectedItem.current = false;
										}
										item.current = true;
										setCurrentPage(item.href);
									}}
									className={classNames(
										item.current
											? "bg-gray-50 text-blue-800 hover:bg-white"
											: "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
										"group rounded-md px-3 py-2 flex items-center text-sm font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									<item.icon
										className={classNames(
											item.current
												? "text-blue-800"
												: "text-gray-400 group-hover:text-gray-500",
											"flex-shrink-0 -ml-1 mr-3 h-6 w-6"
										)}
										aria-hidden="true"
									/>
									<span className="truncate">{item.name}</span>
								</a>
							))}
						</nav>
					</aside>
					<div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
						{currentPage === "profile" && (
							<>
								{userType === "Job Seeker" && (
									<>
										<SeekerProfileSettingsForm />
										<SeekerProfilePic />
										<SeekerProfileVideo />
										<SeekerProfileCv />
									</>
								)}
								{userType === "Recruiter" && (
									<>
										<RecruiterProfileSettingsForm />
									</>
								)}
								{userType === "" && (
									<div className="p-5">
										<SyncLoader color="#374151" speedMultiplier={0.6} />
									</div>
								)}{" "}
							</>
						)}
						{currentPage === "password" && <ChangePasswordForm />}
						{currentPage === "notification" && (
							<>
								<div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
									<div className="px-6 py-8">
										<h1 className="text-2xl font-semibold text-gray-800">
											Notification Feature
										</h1>
										<p className="text-gray-700 mt-4">
											The notification function will be implemented in the
											future. Stay tuned!
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
