import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { Model } from 'mongoose';
import { BaseModel } from '../models';
import { BaseRepository } from '../repositories';
import { BaseDocument, ModelRefs } from '../types';

function repositoryFactory<TModel extends BaseModel>(
	repository: BaseRepository<TModel, ModelRefs<BaseModel>>,
	model: Model<BaseDocument<TModel>>,
) {
	repository.setModel(model);

	return repository;
}

function createRepositoryProvider<TModel extends BaseModel>(
	token: string,
): Provider<BaseRepository<TModel, ModelRefs<BaseModel>>> {
	return {
		provide: `${token}Repository`,
		useFactory: (
			repository: BaseRepository<TModel, ModelRefs<BaseModel>>,
			model: Model<BaseDocument<TModel>>,
		) => {
			return repositoryFactory<TModel>(repository, model);
		},
		inject: [BaseRepository, getModelToken(token)],
	};
}

export function createRepositoryProviders(
	models: ClassConstructor<BaseModel>[],
): Array<Provider<BaseRepository<BaseModel, ModelRefs<BaseModel>>>> {
	return models.map((model) => {
		return createRepositoryProvider(model.name);
	});
}
