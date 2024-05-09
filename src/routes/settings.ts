import { createFileRoute, redirect } from "@tanstack/react-router";
import { SettingsPage } from "../pages/settings";
import { isUserAuthenticated } from "../common/utils";
import { successToast } from "../common/enums";

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