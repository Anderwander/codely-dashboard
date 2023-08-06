export interface DevDashConfig {
	github_access_token: string;
	widgets: {
		id: string;
		repository_url: string;
	}[];
}

export const config: DevDashConfig = {
	github_access_token: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN as string,
	widgets: [
		{
			id: "07340a0f-58e4-4113-bd30-42bc24edc191",
			repository_url: "https://github.com/Anderwander/Fight",
		},
		{
			id: "cbcb3aba-08a9-4e2b-8ffe-addeda0081f9",
			repository_url: "https://github.com/Anderwander/Andnime",
		},
		{
			id: "ebd7bb40-45fb-4867-9ba3-08d20257dfc3",
			repository_url: "https://github.com/Anderwander/hyruleshop",
		},
	],
};
