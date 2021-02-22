import { Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { getRepositoryToken } from 'src/data/utils';
import { serviceTokenKeyword } from '../decorators';
import { BaseService } from '../services';

function serviceFactory<TModel extends BaseModel>(
	service: BaseService<TModel>,
	repository: BaseRepository<TModel>,
) {
	service.setRepository(repository);

	return service;
}

function createServiceProvider<TModel extends BaseModel>(
	token: string,
): Provider<BaseService<TModel>> {
	return {
		provide: `${token}${serviceTokenKeyword}`,
		useFactory: (service: BaseService<TModel>, repository: BaseRepository<TModel>) => {
			return serviceFactory<TModel>(service, repository);
		},
		inject: [BaseService, getRepositoryToken(token)],
	};
}

export function createServiceProviders(
	models: ClassConstructor<BaseModel>[],
): Provider<BaseService<BaseModel>>[] {
	const modelTokens = models.map((model) => model.name);

	return modelTokens.map((modelToken) => {
		return createServiceProvider(modelToken);
	});
}

export function getServiceToken(modelToken: string): string {
	return `${modelToken}${serviceTokenKeyword}`;
}
