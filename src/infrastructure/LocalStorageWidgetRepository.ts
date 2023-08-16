import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../domain/RepositoryWidgetRepository";

export class LocalStorageWidgetRepository implements RepositoryWidgetRepository {
	async save(widget: RepositoryWidget): Promise<void> {
		await Promise.resolve();
	}
}
