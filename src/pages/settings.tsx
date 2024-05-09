import type { FunctionComponent } from "../common/types";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

export const SettingsPage = (): FunctionComponent => {
    return(
        <div className="flex flex-col h-screen justify-between">
            <Navbar />
                <h1 className="text-center">
                    This is the settings page...
                </h1>
            <Footer />
        </div>
    );
}