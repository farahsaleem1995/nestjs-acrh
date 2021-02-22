import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';

export const serviceProviderModelTokens: string[] = [];
export const serviceTokenKeyword = 'Service';

export const InjectService = (model: ClassConstructor<BaseModel>) => {
	const modelToken = model.name;

	if (!serviceProviderModelTokens.includes(modelToken)) {
		serviceProviderModelTokens.push(modelToken);
	}

	return Inject(`${modelToken}${serviceTokenKeyword}`);
};
