import React, { useState } from "react";
import { ReactComponent as Add } from "../../assets/svgs/add.svg";
import styles from "./AddWidgetForm.module.scss";

type FormEvent<T extends { [key: string]: string }> = React.FormEvent<HTMLFormElement> & {
	elements: { [key in keyof T]: { value: T[key] } };
};
type FormData = { id: string; url: string };

export function AddWidgetForm() {
	const [isFormActive, setIsFormActive] = useState(false);

	const submitForm = (ev: FormEvent<FormData>) => {
		ev.preventDefault();
		const t = ev.elements.url.value;
		//Save new repository

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
