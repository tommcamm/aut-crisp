import { createFileRoute } from "@tanstack/react-router";
import { SignInPage } from "../pages/Sign-in";

export const Route = createFileRoute("/auth")({
	component: SignInPage,
});
