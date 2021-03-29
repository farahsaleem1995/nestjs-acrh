import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ClassConstructor } from 'class-transformer';
import { getRepositoryToken } from '.';
import { repositoryProviderModels } from '../decorators';
import { BaseModel } from '../models';
import { Repository } from '../repositories';

function repositoryFactory<TModel extends BaseModel>(
	model: ModelType<TModel>,
	modelCtr: ClassConstructor<TModel>,
) {
	return new Repository<TModel>(model, modelCtr);
}

function createRepositoryProvider<TModel extends BaseModel>(
	modelCtr: ClassConstructor<TModel>,
): Provider<Repository<TModel>> {
	return {
		provide: getRepositoryToken(modelCtr),
		useFactory: (model: ModelType<TModel>) => {
			return repositoryFactory<TModel>(model, modelCtr);
		},
		inject: [getModelToken(modelCtr.name)],
	};
}

export function createRepositoryProviders(): Provider<Repository<BaseModel>>[] {
	return repositoryProviderModels.map((model) => {
		return createRepositoryProvider(model);
	});
}
