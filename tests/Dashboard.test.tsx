import { render, screen } from "@testing-library/react";

import { githubApiResponses } from "../github_api_responses";
import { GithubApiGithubRepositoryRepository } from "../src/infrastructure/GithubApiGithubRepositoryRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";

jest.mock("../src/infrastructure/GithubApiGithubRepositoryRepository");
const mockRepository =
	GithubApiGithubRepositoryRepository as jest.Mock<GithubApiGithubRepositoryRepository>;

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		mockRepository.mockImplementationOnce(() => {
			//mockImplementationOnce() es una función de Jest que permite reemplazar la implementación de una función por otra y eso quiere decir que cuando se llame a la función GithubApiGithubRepositoryRepository se va a ejecutar la función que se pasa como parámetro.
			return {
				// se retorna un objeto con la función search que retorna una promesa con el array de respuestas de la api
				search: () => Promise.resolve(githubApiResponses),
			} as unknown as GithubApiGithubRepositoryRepository;
		});

		render(<Dashboard />); // se renderiza el componente

		const title = await screen.findByRole("heading", {
			// el "heading" es para buscar un elemento h1, h2, h3, etc
			name: new RegExp("DevDash_", "i"),
		});

		const firstWidgetTitle = `${githubApiResponses[0].repositoryData.organization.login}/${githubApiResponses[0].repositoryData.name}`;
		// en esta linea primero se obtiene el titulo del primer widget del array de respuestas de la api y luego se crea una expresión regular con el titulo para poder buscarlo en el dom
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"), // en esta linea la "i" es para que la expresión regular sea case insensitive
		});
		expect(title).toBeInTheDocument();
		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([]),
			} as unknown as GithubApiGithubRepositoryRepository;
		});

		render(<Dashboard />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const mockedResponse = [...githubApiResponses];
		mockedResponse[0].repositoryData.updated_at = new Date().toISOString();

		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve(githubApiResponses),
			} as unknown as GithubApiGithubRepositoryRepository;
		});

		render(<Dashboard />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
