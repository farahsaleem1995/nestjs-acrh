export const repositoryTokenKeyword = 'Repository';

export function getRepositoryToken(modelName: string): string {
	return `${modelName}${repositoryTokenKeyword}`;
}
