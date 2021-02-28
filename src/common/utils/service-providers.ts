import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { getRepositoryToken } from 'src/data/utils';
import { getServiceToken } from '.';
import { serviceProviderModelTokens } from '../decorators/inject-service.decorator';
import { BaseService } from '../services';

function serviceFactory<TModel extends BaseModel>(
	service: BaseService<TModel>,
	repository: BaseRepository<TModel>,
) {
	service.setRepository(repository);

	return service;
}

function createServiceProvider<TModel extends BaseModel>(
	modelToken: string,
): Provider<BaseService<TModel>> {
	return {
		provide: getServiceToken(modelToken),
		useFactory: (service: BaseService<TModel>, repository: BaseRepository<TModel>) => {
			return serviceFactory<TModel>(service, repository);
		},
		inject: [BaseService, getRepositoryToken(modelToken)],
	};
}

export function createServiceProviders(
	models: ClassConstructor<BaseModel>[],
): Provider<BaseService<BaseModel>>[] {
	return serviceProviderModelTokens
		.filter((modelToken) => models.map((model) => model.name).includes(modelToken))
		.map((modelToken) => {
			return createServiceProvider(modelToken);
		});
}
