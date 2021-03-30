import { mixin } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { IDeleteStrategy } from '../interfaces';

export function DeleteStrategy<TModel extends BaseModel>(model: ClassConstructor<TModel>) {
	class DeleteStrategy<TModel extends BaseModel> implements IDeleteStrategy<TModel> {
		constructor(@InjectRepository(model) private readonly repository: Repository<TModel>) {}

		delete(id: string): TModel | Promise<TModel> {
			return this.repository.deleteById(id);
		}
	}

	return mixin(DeleteStrategy);
}
