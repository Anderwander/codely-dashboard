import React from "react";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Lock } from "./lock.svg";
import { ReactComponent as Unlock } from "./unlock.svg";
import { ReactComponent as Check } from "./check.svg";
import { ReactComponent as Error } from "./error.svg";
import { ReactComponent as Brand } from "./brand.svg";
import { ReactComponent as Watchers } from "./watchers.svg";
import { ReactComponent as Forks } from "./repo-forked.svg";
import { ReactComponent as Start } from "./star.svg";
import { ReactComponent as PullRequests } from "./git-pull-request.svg";
import { ReactComponent as IssueOpened } from "./issue-opened.svg";
import { InMemoryGithubRepositoryRepository } from "../../infrastructure/InMemoryGithubRepositoryrepository";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

const repository = new InMemoryGithubRepositoryRepository();

const repositories = repository.search();

export function Dashboard() {
	return (
		<React.Fragment>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositories.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								target="_blank"
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
						{widget.ciStatus.workflow_runs.length > 0 && (
							<div>
								{widget.ciStatus.workflow_runs[0].status === "completed" ? <Check /> : <Error />}
							</div>
						)}
					</article>
				))}
			</section>
		</React.Fragment>
	);
}
