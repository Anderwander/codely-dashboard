import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { GitHubRepositoryDetail } from "./sections/details/GitHubRepositoryDetail";

const router = createBrowserRouter([
	{
		path: "/",
		element: DashboardFactory.create(),
	},
	{
		path: "/repository/:organization/:name",
		element: <GitHubRepositoryDetail />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
