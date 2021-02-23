import { Inject } from '@nestjs/common';
import { getRepositoryToken } from '../utils';

export const repositoryProviderModelNames: string[] = [];

export const InjectRepository = (modelName: string) => {
	if (!repositoryProviderModelNames.includes(modelName)) {
		repositoryProviderModelNames.push(modelName);
	}

	return Inject(getRepositoryToken(modelName));
};
