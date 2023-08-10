import { CiStatus, GitHubApiResponses, PullRequest, RepositoryData } from "./GithubApiResponse";

interface RepositoryId {
	// esto significa que el objeto RepositoryId tiene dos propiedades, name y organization, ambas de tipo string e interface sirve para definir un tipo de dato.
	organization: string;
	name: string;
}

export class GithubApiGithubRepositoryRepository {
	// esta clase es la que se encarga de hacer las llamadas a la API de Github
	private readonly endpoints = [
		// aquí private significa que solo se puede acceder a esta propiedad desde dentro de la clase, readonly significa que no se puede modificar el valor de esta propiedad
		"https://api.github.com/repos/$organization/$name",
		"https://api.github.com/repos/$organization/$name/pulls",
		"https://api.github.com/repos/$organization/$name/actions/runs?page=1per_page=1",
	];

	constructor(private readonly personalAccessToken: string) {} // aquí constructor es un método especial que se ejecuta cuando se crea una instancia de la clase, en este caso recibe un parámetro de tipo string y lo asigna a la propiedad personalAccessToken

	async search(repositoryUrls: string[]): Promise<GitHubApiResponses[]> {
		// aquí async significa que la función es asíncrona y devuelve una promesa de tipo GitHubApiResponses
		const responsePromises = repositoryUrls
			.map((url) => this.urlToId(url)) // este map recorre el array repositoryUrls y por cada elemento ejecuta el método urlToId que a su vez devuelve un objeto de tipo RepositoryId con las propiedades name y organization
			.map((id) => this.searchBy(id)); // este map recorre el array que devuelve el map anterior y por cada elemento ejecuta el método searchBy que a su vez devuelve un objeto de tipo GitHubApiResponses

		return Promise.all(responsePromises); // aquí Promise.all() devuelve una promesa que se resuelve cuando todas las promesas del array que recibe como parámetro se han resuelto
	}

	private async searchBy(repositoryId: RepositoryId): Promise<GitHubApiResponses> {
		const repositoryRequests = this.endpoints // aquí se ejecuta el método urlToId que a su vez devuelve un objeto de tipo RepositoryId con las propiedades name y organization
			.map((endpoint) => endpoint.replace("$organization", repositoryId.organization)) // aquí el map recorre el array this.endpoints y por cada elemento ejecuta el método replace que reemplaza el string "$organization" por el valor de la propiedad organization del objeto repositoryId
			.map((endpoint) => endpoint.replace("$name", repositoryId.name))
			.map((url) =>
				fetch(url, {
					headers: {
						Authorization: `Bearer ${this.personalAccessToken}`, // aquí se añade el token de acceso personal a la cabecera de la petición
					},
				})
			);

		return Promise.all(repositoryRequests) // aquí Promise.all() devuelve una promesa que se resuelve cuando todas las promesas del array que recibe como parámetro se han resuelto
			.then((responses) => Promise.all(responses.map((response) => response.json()))) // aquí se ejecuta el método json() de cada respuesta del array responses y devuelve una promesa que se resuelve cuando todas las promesas del array que recibe como parámetro se han resuelto
			.then(([repositoryData, pullRequests, ciStatus]) => {
				// aquí se desestructura el array que devuelve el método json() y se asigna cada elemento a una variable
				return {
					repositoryData: repositoryData as RepositoryData,
					pullRequests: pullRequests as PullRequest[],
					ciStatus: ciStatus as CiStatus,
				};
			});
	}

	private urlToId(url: string): RepositoryId {
		const splitUrl = url.split("/");

		return {
			name: splitUrl.pop() as string, // aquí pop() es un método que elimina el último elemento de un array y lo devuelve, en este caso devuelve el nombre del repositorio
			organization: splitUrl.pop() as string,
		};
	}
}
