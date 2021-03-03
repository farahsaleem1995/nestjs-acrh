import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ClassConstructor } from 'class-transformer';
import { getRepositoryToken } from '.';
import { repositoryProviderModels } from '../decorators';
import { BaseModel } from '../models';
import { Repository } from '../repositories';

function repositoryFactory<TModel extends BaseModel>(
	repository: Repository<TModel>,
	model: ModelType<TModel>,
	modelCtr: ClassConstructor<TModel>,
) {
	repository.setModel(model, modelCtr);

	return repository;
}

function createRepositoryProvider<TModel extends BaseModel>(
	modelName: string,
	modelCtr: ClassConstructor<TModel>,
): Provider<Repository<TModel>> {
	return {
		provide: getRepositoryToken(modelName),
		useFactory: (repository: Repository<TModel>, model: ModelType<TModel>) => {
			return repositoryFactory<TModel>(repository, model, modelCtr);
		},
		inject: [Repository, getModelToken(modelName)],
	};
}

export function createRepositoryProviders(): Provider<Repository<BaseModel>>[] {
	return repositoryProviderModels.map((model) => {
		const { modelName, modelCtr } = model;
		return createRepositoryProvider(modelName, modelCtr);
	});
}
