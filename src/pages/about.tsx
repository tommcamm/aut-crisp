import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

export const AboutPage = (): FunctionComponent => {
	return (
        <div className="flex flex-col h-screen justify-between">
            <Navbar />
            <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <div className="flex flex-col md:flex-row mx-auto w-full max-w-2xl">
                <div className="w-full md:w-2/3 pl-4 md:pl-6 text-center mx-auto">
                <h2 className="text-2xl font-bold">About us</h2>
                <p className="mt-4">
                    CRISP offers a comprehensive solution designed to empower both job seekers and recruiters. For job seekers, CRISP provides an intuitive platform to craft personalised profiles, complemented by the ability to upload introductory videos and traditional CVs. This multimedia approach surpasses the confines of conventional resumes, compelling candidates to showcase their skills, experiences, and personality.
                </p>
                <p className="mt-4">
                    On the recruiter's front, CRISP equips hiring professionals with tools to effortlessly post job listings, rate, and engage with candidates. Furthermore, CRISP facilitates seamless communication channels, fostering meaningful interactions between recruiters and candidates throughout the recruitment journey.
                </p>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
};
