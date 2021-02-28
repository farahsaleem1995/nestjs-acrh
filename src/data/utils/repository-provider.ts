import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { getRepositoryToken } from '.';
import { repositoryProviderModelTokens } from '../decorators';
import { BaseModel } from '../models';
import { Repository } from '../repositories';

function repositoryFactory<TModel extends BaseModel>(
	repository: Repository<TModel>,
	model: ModelType<TModel>,
) {
	repository.setModel(model);

	return repository;
}

function createRepositoryProvider<TModel extends BaseModel>(
	modelName: string,
): Provider<Repository<TModel>> {
	return {
		provide: getRepositoryToken(modelName),
		useFactory: (repository: Repository<TModel>, model: ModelType<TModel>) => {
			return repositoryFactory<TModel>(repository, model);
		},
		inject: [Repository, getModelToken(modelName)],
	};
}

export function createRepositoryProviders(): Provider<Repository<BaseModel>>[] {
	return repositoryProviderModelTokens.map((modelName) => {
		return createRepositoryProvider(modelName);
	});
}
