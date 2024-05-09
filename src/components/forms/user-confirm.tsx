/* eslint-disable @typescript-eslint/no-misused-promises */
import { autoSignIn, confirmSignUp } from "aws-amplify/auth";
import { useState } from "react";
import { confirmType, successToast } from "../../common/enums";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { useNavigate  } from '@tanstack/react-router';

interface Props {
	email: string;
	type?: confirmType;
	redirect?: string;
}

const defaultProps :Props = {
	email: 'undefined',
	type: confirmType.signIn,
	redirect: '/'
}

export const UserConfirmForm: React.FC<Props> = (props: Props) => {
	const propsWithDefaults = {
		...defaultProps,
		...props,
	}
	
	const { email, redirect } = propsWithDefaults;

	const navigate = useNavigate();

	const [confirmationCode, setConfirmationCode] = useState<string>("");
	const [error, setError] = useState<string>("");

	async function handleConfirm(event: React.FormEvent<HTMLFormElement>) :Promise<void> {
		event.preventDefault(); 

		
		try {
			const { isSignUpComplete, nextStep } = await confirmSignUp({
			  username: email,
			  confirmationCode
			});

			if (isSignUpComplete) {
				await autoSignIn();
				await navigate({to: redirect, search: {toastID: successToast.confirmedAcc} });
			} else {
				setError('Verification done but not completed');
				console.log('Reason verification NOK:',nextStep);
			}
			
		  } catch (error) {
			console.log('error confirming sign up', error);
			if (typeof error === "string") {
                setError(error);
            } else if (error instanceof Error) {
                setError(error.message); // works, `e` narrowed to Error
            } else {
                setError('Unexpected error');
            }
		  }
	}

	return (
		<>
		{error && (
			 <div className="rounded-md bg-red-50 p-4">
			 <div className="flex">
				 <div className="flex-shrink-0">
					 <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
				 </div>
				 <div className="ml-3">
					 <h3 className="text-sm font-medium text-red-800">
						 Error while confirming account
					 </h3>
					 <div className="mt-2 text-sm text-red-700">
						 {error}
					 </div>
				 </div>
			 </div>
		 </div>
		)}
		<form onSubmit={handleConfirm}>
			<h2 className="text-base font-semibold leading-7 text-gray-900">
				Confirm your account
			</h2>
			<p className="mt-1 text-sm leading-6 text-gray-600">
				A confirmation code was sent to your inbox, please write the code in the
				form below.
			</p>

			<div className="sm:col-span-3 py-2">
				<label
					htmlFor="email"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Email address
				</label>
				<div className="mt-2">
					<input
						type="email"
						disabled={true}
						name="email"
						id="email"
						value={email}
						className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div className="sm:col-span-3 py-2">
				<label
					htmlFor="confirmation-code"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Confirmation code
				</label>
				<div className="mt-2">
					<input
						type="text"
						name="confirmation-code"
						id="confirmation-code"
						value={confirmationCode}
						onChange={cd => {setConfirmationCode(cd.target.value)}}
						className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			{/* Submit Button */}
			<div className="py-4">
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Confirm account
				</button>
			</div>
		</form>
		</>
	);
};
