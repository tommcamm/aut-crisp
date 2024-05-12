import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProfilePage } from "../pages/profile";
import { isUserAuthenticated } from "../common/utils";
import { successToast } from "../common/enums";


export const Route = createFileRoute("/profile")({
	component: ProfilePage,
	beforeLoad: async ({ location }) => {
        if (!await isUserAuthenticated()) {
            throw redirect({
                to: "/auth",
                search: {
                    redirect: location.href,
                    toastID: successToast.notAuthenticated
                }
            })
        }
    }
});