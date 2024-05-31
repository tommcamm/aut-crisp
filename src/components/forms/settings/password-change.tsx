/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
import React, { useState } from "react";
import { FunctionComponent } from "../../../common/types";
import { handleUpdatePassword } from "../../../common/api/auth-api";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export const ChangePasswordForm = (): FunctionComponent => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [successMsg, setSuccessMsg] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>("");

	async function handlePasswordChange(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		setSuccessMsg(false);
		setErrorMsg("");

        if (newPassword !== confirmPassword) {
            setErrorMsg("Passwords do not match.");
            return;
        }

		console.log("Updating password...");
		try {
			await handleUpdatePassword({
				oldPassword: currentPassword,
				newPassword: newPassword,
			});
			setSuccessMsg(true);
		} catch (error) {
			if (typeof error === "string") {
                setErrorMsg(error);
            } else if (error instanceof Error) {
                setErrorMsg(error.message); // works, `e` narrowed to Error
            } else {
                setErrorMsg('Error while updating the password. Please try again.');
            }
		}
	}

	return (
		<section aria-labelledby="change-password">
			<form onSubmit={handlePasswordChange}>
				<div className="shadow sm:rounded-md sm:overflow-hidden">
					<div className="bg-white py-6 px-4 sm:p-6">
						<div>
							<h2
								id="change-password-heading"
								className="text-lg leading-6 font-medium text-gray-900"
							>
								Change Password
							</h2>
							<p className="mt-1 text-sm text-gray-500">
								Update your password for security reasons. Please ensure your
								new password is strong.
							</p>
							<div className="pt-3">
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
													Password updated successfully!
												</h3>
											</div>
										</div>
									</div>
								)}
                                {errorMsg !== "" && (
									<div className="rounded-md bg-red-50 p-4">
										<div className="flex">
											<div className="flex-shrink-0">
												<XCircleIcon
													className="h-5 w-5 text-red-400"
													aria-hidden="true"
												/>
											</div>
											<div className="ml-3">
												<h3 className="text-sm font-medium text-red-800">
													{errorMsg}
												</h3>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="mt-6 grid grid-cols-4 gap-6">
							<div className="col-span-4 sm:col-span-2">
								<label
									htmlFor="current-password"
									className="block text-sm font-medium text-gray-700"
								>
									Current Password
								</label>
								<input
									type="password"
									name="current-password"
									id="current-password"
									value={currentPassword}
									onChange={(e) => {
										setCurrentPassword(e.target.value);
									}}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
								/>
							</div>

							<div className="col-span-4 sm:col-span-2">
								<label
									htmlFor="new-password"
									className="block text-sm font-medium text-gray-700"
								>
									New Password
								</label>
								<input
									type="password"
									name="new-password"
									id="new-password"
									value={newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value);
									}}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
								/>
							</div>

							<div className="col-span-4 sm:col-span-2">
								<label
									htmlFor="confirm-password"
									className="block text-sm font-medium text-gray-700"
								>
									Confirm New Password
								</label>
								<input
									type="password"
									name="confirm-password"
									id="confirm-password"
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
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
							Update password
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};
