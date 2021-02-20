import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { repositoryProviderModelTokens, repositoryTokenKeyword } from '../decorators';
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
		provide: `${token}${repositoryTokenKeyword}`,
		useFactory: (
			repository: BaseRepository<TModel, ModelRefs<BaseModel>>,
			model: Model<BaseDocument<TModel>>,
		) => {
			return repositoryFactory<TModel>(repository, model);
		},
		inject: [BaseRepository, getModelToken(token)],
	};
}

export function createRepositoryProviders(): Array<
	Provider<BaseRepository<BaseModel, ModelRefs<BaseModel>>>
> {
	return repositoryProviderModelTokens.map((modelToken) => {
		return createRepositoryProvider(modelToken);
	});
}
