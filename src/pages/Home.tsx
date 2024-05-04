import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { Carousel } from "../components/layout/carousel";

export const Home = (): FunctionComponent => {
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar/>
			<Carousel />
			<Footer/>
		</div>
	);
};
