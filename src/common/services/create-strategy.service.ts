import { mixin } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { ICreateStrategy } from '../interfaces';
import { CreateOneParamDto } from '../types';

export function CreateStrategy<TModel extends BaseModel>(model: ClassConstructor<TModel>) {
	class CreateStrategy<TModel extends BaseModel> implements ICreateStrategy<TModel> {
		constructor(@InjectRepository(model) private readonly repository: Repository<TModel>) {}

		create(createDto: CreateOneParamDto<TModel>): TModel | Promise<TModel> {
			return this.repository.create(createDto);
		}
	}

	return mixin(CreateStrategy);
}
