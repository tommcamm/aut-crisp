import { useEffect, useState } from "react";
import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { getSignedInUserProperties } from "../common/api/auth-api";
import {
	getDefaultProfilePicUrl,
	getProfilePicUrl,
} from "../common/utils";


export const ProfilePage = (): FunctionComponent => {
    const [picUrl, setPicUrl] = useState<string>("");

	async function fetchData(): Promise<void> {
		const defaultUrl = await getDefaultProfilePicUrl();
		const picUrl = await getProfilePicUrl();

		setPicUrl(picUrl === "" ? defaultUrl : picUrl);
	}


    const [name, setName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
    

	useEffect(() => {
        void fetchData();
    }, []);

    return(
        <div className="flex flex-col h-screen justify-between">
            <Navbar />
            <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 relative group">
                        <img src={picUrl} className="inline-block h-48 w-48 rounded-md" alt=""/>
                    </div>
                    <div className="w-full md:w-2/3 pl-4 md:pl-6">
                        <h2 className="text-2xl font-bold">{name} {lastName}</h2>
                        <p className="text-lg">email: {email}</p>
                        <p className="text-lg">My skills</p>
                        <p>About me: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum voluptate eaque minus sit earum, reprehenderit aspernatur. Facere quasi distinctio perspiciatis quod, ut, accusamus tempore labore commodi corporis iure ea ipsum.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}