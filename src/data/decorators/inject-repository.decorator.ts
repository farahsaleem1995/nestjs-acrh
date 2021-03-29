import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from '../models';
import { getRepositoryToken } from '../utils';

export const repositoryProviderModels: ClassConstructor<BaseModel>[] = [];

export const InjectRepository = <TModel extends BaseModel>(model: ClassConstructor<TModel>) => {
	const modelName = model.name;

	if (!repositoryProviderModels.map((model) => model.name).includes(modelName)) {
		repositoryProviderModels.push(model);
	}

	return Inject(getRepositoryToken(model));
};
