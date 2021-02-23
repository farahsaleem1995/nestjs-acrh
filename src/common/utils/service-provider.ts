import { Provider } from '@nestjs/common';
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
	modelName: string,
): Provider<BaseService<TModel>> {
	return {
		provide: getServiceToken(modelName),
		useFactory: (service: BaseService<TModel>, repository: BaseRepository<TModel>) => {
			return serviceFactory<TModel>(service, repository);
		},
		inject: [BaseService, getRepositoryToken(modelName)],
	};
}

export function createServiceProviders(modelNames: string[]): Provider<BaseService<BaseModel>>[] {
	return modelNames.map((modelName) => {
		return createServiceProvider(modelName);
	});
}

export function getServiceToken(modelName: string): string {
	return `${modelName}${serviceTokenKeyword}`;
}
