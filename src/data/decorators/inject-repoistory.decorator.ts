import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from '../models';

export const repositoryModelTokens: string[] = new Array<string>();

export const InjectRepository = (model: ClassConstructor<BaseModel>) => {
	const token = model.name;
	if (!repositoryModelTokens.includes(token)) {
		repositoryModelTokens.push(token);
	}

	return Inject(`${token}Repository`);
};
