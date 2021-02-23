import { Inject } from '@nestjs/common';
import { InjectRepository } from 'src/data/decorators';
import { getServiceToken } from '../utils';

export const serviceProviderModelNames: string[] = [];

export const InjectService = (modelName: string) => {
	if (!serviceProviderModelNames.includes(modelName)) {
		serviceProviderModelNames.push(modelName);
	}

	InjectRepository(modelName);

	return Inject(getServiceToken(modelName));
};
