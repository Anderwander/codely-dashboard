import React from "react";

import { config } from "../../devdash-config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GithubApiGithubRepositoryRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageWidgetRepository";
import { Dashboard } from "./Dashboard";

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	config.github_access_token
);
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export class DashboardFactory {
	static create(): React.ReactElement {
		return (
			<Dashboard
				gitHubRepositoryRepository={gitHubRepositoryRepository}
				repositoryWidgetRepository={repositoryWidgetRepository}
			/>
		);
	}
}
