import { mixin } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { IUpdateStrategy } from '../interfaces';
import { UpdateOneParamDto } from '../types';

export function UpdateStrategy<TModel extends BaseModel>(model: ClassConstructor<TModel>) {
	class UpdateStrategy<TModel extends BaseModel> implements IUpdateStrategy<TModel> {
		constructor(@InjectRepository(model) private readonly repository: Repository<TModel>) {}

		update(id: string, updateDto: UpdateOneParamDto<TModel>): TModel | Promise<TModel> {
			return this.repository.updateById(id, updateDto);
		}
	}

	return mixin(UpdateStrategy);
}
