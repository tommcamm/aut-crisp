import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { Carousel } from "../components/layout/carousel";

import 'react-toastify/dist/ReactToastify.css';
import { Toasts } from "../components/ui/toasts";

export const Home = (): FunctionComponent => {

	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar/>
			<Carousel />
			<Toasts />
			<Footer/>
		</div>
	);
};
