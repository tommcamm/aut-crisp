import type { FunctionComponent } from "react";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

export const AboutPage: FunctionComponent = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar currentPage="about"/>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 flex-grow">
        <div className="flex flex-col md:flex-row items-center mx-auto w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <div className="flex items-start mb-6">
              <p className="text-gray-700 text-lg">
                CRISP offers a comprehensive solution designed to empower both job seekers and recruiters. For job seekers, CRISP provides an intuitive platform to craft personalized profiles, complemented by the ability to upload introductory videos and traditional CVs. This multimedia approach surpasses the confines of conventional resumes, compelling candidates to showcase their skills, experiences, and personality.
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-gray-700 text-lg">
                On the recruiter's front, CRISP equips hiring professionals with tools to effortlessly post job listings, rate, and engage with candidates. Furthermore, CRISP facilitates seamless communication channels, fostering meaningful interactions between recruiters and candidates throughout the recruitment journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
