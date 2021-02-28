import { Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { getRepositoryToken } from 'src/data/utils';
import { getServiceToken } from '.';
import { serviceProviderModelTokens } from '../decorators';
import { Service } from '../services';

function serviceFactory<TModel extends BaseModel>(
	service: Service<TModel>,
	repository: Repository<TModel>,
) {
	service.setRepository(repository);

	return service;
}

function createServiceProvider<TModel extends BaseModel>(
	modelToken: string,
): Provider<Service<TModel>> {
	return {
		provide: getServiceToken(modelToken),
		useFactory: (service: Service<TModel>, repository: Repository<TModel>) => {
			return serviceFactory<TModel>(service, repository);
		},
		inject: [Service, getRepositoryToken(modelToken)],
	};
}

export function createServiceProviders(
	models: ClassConstructor<BaseModel>[],
): Provider<Service<BaseModel>>[] {
	models.forEach((model) => InjectRepository(model));

	return serviceProviderModelTokens
		.filter((modelToken) => models.map((model) => model.name).includes(modelToken))
		.map((modelToken) => createServiceProvider(modelToken));
}
