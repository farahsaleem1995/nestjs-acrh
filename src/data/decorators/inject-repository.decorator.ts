import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from '../models';
import { getRepositoryToken } from '../utils';

export const repositoryProviderModelTokens: string[] = [];

export const InjectRepository = (model: ClassConstructor<BaseModel>) => {
	const modelToken = model.name;

	if (!repositoryProviderModelTokens.includes(modelToken)) {
		repositoryProviderModelTokens.push(modelToken);
	}

	return Inject(getRepositoryToken(modelToken));
};
