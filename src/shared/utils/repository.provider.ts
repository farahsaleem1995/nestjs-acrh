import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { repositoryModelTokens } from '../decorators';
import { BaseDocument, BaseModel } from '../models';
import { BaseRepository } from '../repositories/base.repository';

function repositoryFactory<TModel extends BaseModel>(
	repository: BaseRepository<TModel>,
	model: Model<BaseDocument<TModel>>,
) {
	repository.setModel(model);

	return repository;
}

function createRepositoryProvider<TModel extends BaseModel>(
	token: string,
): Provider<BaseRepository<TModel>> {
	return {
		provide: `${token}Repository`,
		useFactory: (repository: BaseRepository<TModel>, model: Model<BaseDocument<TModel>>) => {
			return repositoryFactory<TModel>(repository, model);
		},
		inject: [BaseRepository, getModelToken(token)],
	};
}

export function createRepositoryProviders(): Array<Provider<BaseRepository<BaseModel>>> {
	return repositoryModelTokens.map((token) => createRepositoryProvider(token));
}
