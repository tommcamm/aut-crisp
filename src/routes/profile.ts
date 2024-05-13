import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProfilePage } from "../pages/profile";
import { successToast } from "../common/enums";
import { isUserAuthenticated } from "../common/api/auth-api";


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