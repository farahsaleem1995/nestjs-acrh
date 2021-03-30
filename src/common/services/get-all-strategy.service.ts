import { mixin } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { IGetAllStrategy } from '../interfaces';
import { FindAllParamDto } from '../types';

export function GetAllStrategy<TModel extends BaseModel>(model: ClassConstructor<TModel>) {
	class GetAllStrategy<TModel extends BaseModel> implements IGetAllStrategy<TModel> {
		constructor(@InjectRepository(model) private readonly repository: Repository<TModel>) {}

		getAll(findAllDto: FindAllParamDto<TModel>): TModel[] | Promise<TModel[]> {
			return this.repository.findAll(findAllDto);
		}
	}

	return mixin(GetAllStrategy);
}
