/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUser } from "@fortawesome/free-regular-svg-icons";
import {
	faArrowRightFromBracket,
	faArrowRightToBracket,
	faGear,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
	getSignedInUserProperties,
	isUserAuthenticated,
} from "../../common/api/auth-api";
import { classNames, fetchCandidateUserData, fetchRecruiterUserData } from "../../common/utils";

export const SignInOutMenu: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [name, setName] = useState<string>("");

	const checkAuth = async (): Promise<void> => {
		setIsAuthenticated(await isUserAuthenticated());

		if (isAuthenticated) {
			const { userType } = await getSignedInUserProperties();

			if (userType === "Job Seeker") {
				const { name } = await fetchCandidateUserData();
				setName(name === "" ? "Job Seeker" : name);
			} else if (userType === "Recruiter") {
				const { name } = await fetchRecruiterUserData();
				setName(name === "" ? "Recruiter" : name);
			}
		}
	};

	useEffect(() => {
		void checkAuth();
	}, [isAuthenticated, name]);

	return (
		<Menu as="div" className="relative ml-3">
			<div>
				<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
					<span className="absolute -inset-1.5" />
					<span className="sr-only">Open user menu</span>
					<FontAwesomeIcon icon={faUser} className="text-white" />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					{isAuthenticated ? (
						<>
							<Menu.Item>
								<p
									className={classNames(
										"block px-4 py-2 text-sm text-gray-700"
									)}
								>
									Howdy, <b>{name}</b>
								</p>
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<a
										href="/profile"
										className={classNames(
											active ? "bg-gray-100" : "",
											"block px-4 py-2 text-sm text-gray-700"
										)}
									>
										<FontAwesomeIcon icon={faAddressCard} className="pr-3" />
										Profile
									</a>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<a
										href="/settings"
										className={classNames(
											active ? "bg-gray-100" : "",
											"block px-4 py-2 text-sm text-gray-700"
										)}
									>
										<FontAwesomeIcon icon={faGear} className="pr-3" />
										Settings
									</a>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<a
										href="/sign-out"
										className={classNames(
											active ? "bg-gray-100" : "",
											"block px-4 py-2 text-sm text-gray-700"
										)}
									>
										<FontAwesomeIcon
											icon={faArrowRightFromBracket}
											className="pr-3"
										/>
										Sign out
									</a>
								)}
							</Menu.Item>
						</>
					) : (
						<>
							<Menu.Item>
								{({ active }) => (
									<a
										href="/auth"
										className={classNames(
											active ? "bg-gray-100" : "",
											"block px-4 py-2 text-sm text-gray-700"
										)}
									>
										<FontAwesomeIcon
											icon={faArrowRightToBracket}
											className="pr-3"
										/>
										Sign In
									</a>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<a
										href="/sign-up"
										className={classNames(
											active ? "bg-gray-100" : "",
											"block px-4 py-2 text-sm text-gray-700"
										)}
									>
										<FontAwesomeIcon icon={faUserPlus} className="pr-2" />
										Create Account
									</a>
								)}
							</Menu.Item>
						</>
					)}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
