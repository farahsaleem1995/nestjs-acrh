import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { getServiceToken } from '../utils';

export const serviceProviderModelTokens: string[] = [];

export function InjectService(model: ClassConstructor<BaseModel>) {
	const modelToken = model.name;

	if (!serviceProviderModelTokens.includes(modelToken)) {
		serviceProviderModelTokens.push(modelToken);
	}

	return Inject(getServiceToken(modelToken));
}
