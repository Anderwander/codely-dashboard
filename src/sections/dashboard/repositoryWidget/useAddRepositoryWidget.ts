import { RepositoryWidget } from "../../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";
import { RepositoryAlreadyExistsError } from "../../../domain/RepositoryAlreadyExistsError";

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	save: (widget: RepositoryWidget) => Promise<RepositoryAlreadyExistsError | void>;
} {
	async function save(widget: RepositoryWidget): Promise<RepositoryAlreadyExistsError | void> {
		const widgetRepositories = await repository.search();

		if (widgetRepositories.some((w) => w.repositoryUrl === widget.repositoryUrl)) {
			return new RepositoryAlreadyExistsError(widget.repositoryUrl);
		}

		await repository.save(widget);
	}

	return { save };
}
