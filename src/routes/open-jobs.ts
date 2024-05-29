import { createFileRoute, redirect } from "@tanstack/react-router";
import { successToast } from "../common/enums";
import { isUserAuthenticated } from "../common/api/auth-api";
import { OpenJobs } from "../pages/open-jobs";

export const Route = createFileRoute("/open-jobs")({
	component: OpenJobs,
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