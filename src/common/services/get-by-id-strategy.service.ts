import { mixin } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { IGetByIdStrategy } from '../interfaces';

export function GetByIdStrategy<TModel extends BaseModel>(model: ClassConstructor<TModel>) {
	class GetByIdStrategy<TModel extends BaseModel> implements IGetByIdStrategy<TModel> {
		constructor(@InjectRepository(model) private readonly repository: Repository<TModel>) {}

		getById(id: string): TModel | Promise<TModel> {
			return this.repository.findById(id);
		}
	}

	return mixin(GetByIdStrategy);
}
