import { Inject } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from '../models';

export const InjectRepository = (model: ClassConstructor<BaseModel>) => {
	const token = model.name;

	return Inject(`${token}Repository`);
};
