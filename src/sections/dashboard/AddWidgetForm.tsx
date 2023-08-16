import React, { useState } from "react";
import { ReactComponent as Add } from "../../assets/svgs/add.svg";
import styles from "./AddWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormFields = { id: string; repositoryUrl: string };

export function AddWidgetForm({ repository }: { repository: RepositoryWidgetRepository }) {
	const [isFormActive, setIsFormActive] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: FormEvent<FormFields>) => {
		ev.preventDefault();
		const { id, repositoryUrl } = ev.target.elements;
		await save({ id: id.value, repositoryUrl: repositoryUrl.value });

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" id="id" />
						</div>
						<div>
							<label htmlFor="url">Url del repositorio</label>
							<input type="text" id="url" />
						</div>

						<div>
							<input type="submit" value={"Añadir"} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
