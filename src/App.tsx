import "react-loading-skeleton/dist/skeleton.css";

import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/repositoryWidget/RepositoryWidgetContextProvider";
import { LocalStorageRepositoryWidgetRepository } from "./infrastructure/LocalStorageWidgetRepository";

const repository = new LocalStorageRepositoryWidgetRepository();

export function App() {
	return (
		<RepositoryWidgetContextProvider repository={repository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
