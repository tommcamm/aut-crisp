import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

export const Home = (): FunctionComponent => {
	return (
		<div>
			<Navbar/>
			<div className="w-screen h-screen flex flex-col justify-center items-center ">
				<p className="text-gray-600 text-5xl">
					this page is WIP
				</p>
			</div>
			<Footer/>
		</div>
	);
};
