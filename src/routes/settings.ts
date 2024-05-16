import { createFileRoute, redirect } from "@tanstack/react-router";
import { SettingsPage } from "../pages/settings";
import { successToast } from "../common/enums";
import { isUserAuthenticated } from "../common/api/auth-api";

export const Route = createFileRoute("/settings")({
	component: SettingsPage,
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