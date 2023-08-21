import React from "react";

import { config } from "../../devdash-config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GithubApiGithubRepositoryRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageWidgetRepository";
import { Dashboard } from "./Dashboard";
import { useRepositoryWidgetContext } from "./repositoryWidget/RepositoryWidgetContextProvider";

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	config.github_access_token
);
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export function DashboardFactory() {
	const { repositoryWidgets } = useRepositoryWidgetContext();
	return (
		<Dashboard
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
			repositoryWidgets={repositoryWidgets}
		/>
	);
}
