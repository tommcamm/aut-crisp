import React, { useState } from 'react';

interface FormData {
  organisationName: string;
  jobName: string;
  duration: string;
  skillsRequired: string;
}

const JobForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    organisationName: '',
    jobName: '',
    duration: '',
    skillsRequired: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="organisationName">Organisation name:</label>
      <input
        type="text"
        name="organisationName"
        value={formData.organisationName}
        onChange={handleInputChange}
      />

      <label htmlFor="jobName">Name of the job:</label>
      <input
        type="text"
        name="jobName"
        value={formData.jobName}
        onChange={handleInputChange}
      />

      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleInputChange}
      />

      <label htmlFor="skillsRequired">Skills required:</label>
      <textarea
        name="skillsRequired"
        value={formData.skillsRequired}
        onChange={handleInputChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default JobForm;