import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import { classNames } from "../../common/utils";
const userTypes = [
    { id: 1, title: 'Job Seeker', description: 'Browse thousands of job openings tailored to you'},
    { id: 2, title: 'Recruiter', description: 'Find the perfect candidate for your company'},
]

export const RadioUserType: React.FC = () => {
    const [selectedUserType, setSelectedUserType] = useState(userTypes[0])

    return(
      <RadioGroup value={selectedUserType} onChange={setSelectedUserType}>
      <RadioGroup.Label className="text-sm font-medium text-gray-900">Select a user type</RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {userTypes.map((userType) => (
          <RadioGroup.Option
            key={userType.id}
            value={userType}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'ring-2 ring-indigo-500' : '',
                'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex-1 flex">
                  <div className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {userType.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                      {userType.description}
                    </RadioGroup.Description>
                  </div>
                </div>
                <CheckCircleIcon
                  className={classNames(checked ? '' : 'invisible', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <div
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg pointer-events-none'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
    );
}