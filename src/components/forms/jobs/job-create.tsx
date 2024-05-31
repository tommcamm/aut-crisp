import { FunctionComponent, useState, useEffect } from "react";
import { Category } from "../../../common/data/category";
import { Job } from "../../../common/data/job";
import { createJob } from "../../../common/api/jobs-api";
import { fetchCandidateUserData } from "../../../common/utils";
import { fetchCategories } from "../../../common/api/categories-api";

export const JobForm: FunctionComponent = () => {
  const [jobCategories, setJobCategories] = useState<Array<Category>>([]);
  const [formData, setFormData] = useState<Job>({
    id: '',
    rid: '',
    title: '',
    description: '',
    salary: '',
    categoryId: '',
  });

  async function fetchData(): Promise<void> {
		setJobCategories(await fetchCategories());
	}

	useEffect(() => {
		void fetchData();
	}, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetchCandidateUserData().then((profile) => {
      const updatedFormData = {...formData, rid: profile.id};
      createJob(updatedFormData).then(() => {
        console.log("Job created successfully!");
        setFormData({
          id: '',
          rid: '',
          title: '',
          description: '',
          salary: '',
          categoryId: '',
        });
        console.log("formDataTitle:", formData.title);
        console.log("formDataCID:", formData.categoryId);
      }).catch((error) => {
        console.error("Error creating job:", error);
      });
    }).catch((error) => {
      console.error("Error fetching candidate user data:", error);
    });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log("categoryID:", event.target.value);
    setFormData({
      ...formData,
      categoryId: event.target.value,
    });
  };

  return (
    
    <section aria-labelledby="job-form">
    <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Create a job offer</h1>
    <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 sm:p-6">
          <div className="mt-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mt-5"
            >
              Job Title*
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={(event) => {
                setFormData({
                 ...formData,
                  title: event.target.value,
                });
              }}
              required
              autoComplete="title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            />

            <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 mt-5"
              >
                Category*
              </label>
              <select
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  {jobCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.description}
                    </option>
                  ))}
                </select>
  
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700 mt-5"
            >
              Salary*
            </label>
            <input
              type="text"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={(event) => {
                setFormData({
                 ...formData,
                  salary: event.target.value,
                });
              }}
              required
              autoComplete="salary"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            />
  
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mt-5"
            >
              Job Description*
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={(event) => {
                setFormData({
                 ...formData,
                  description: event.target.value,
                });
              }}
              required
              autoComplete="description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm  min-h-[100px]"
            />
  
            <button
              type="submit"
              className="mt-6 w-full bg-gray-900 border border-transparentrounded-md shadow-sm py-2 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Create Job
            </button>
          </div>
          </div>
          </div>
        </form>
      </section>
  );
};