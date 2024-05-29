import { Dashboard } from "../pages/dashboard";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { successToast } from "../common/enums";
import { isUserAuthenticated } from "../common/api/auth-api";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
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