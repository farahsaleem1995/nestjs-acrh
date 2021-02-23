import { Inject } from '@nestjs/common';

export const repositoryProviderModelNames: string[] = [];
export const repositoryTokenKeyword = 'Repository';

export const InjectRepository = (modelName: string) => {
	if (!repositoryProviderModelNames.includes(modelName)) {
		repositoryProviderModelNames.push(modelName);
	}

	return Inject(`${modelName}${repositoryTokenKeyword}`);
};
