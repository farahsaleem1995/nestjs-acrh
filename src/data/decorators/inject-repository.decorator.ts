import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from '../models';
import { getRepositoryToken } from '../utils';

export const repositoryProviderModels: {
	modelName: string;
	modelCtr: ClassConstructor<BaseModel>;
}[] = [];

export const InjectRepository = (model: ClassConstructor<BaseModel>) => {
	const modelName = model.name;

	if (!repositoryProviderModels.map((model) => model.modelName).includes(modelName)) {
		repositoryProviderModels.push({ modelName, modelCtr: model });
	}

	return Inject(getRepositoryToken(modelName));
};
