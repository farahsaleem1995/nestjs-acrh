import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

@Injectable({ scope: Scope.TRANSIENT })
export class CreateOperation<TModel extends BaseModel, TCreateDTo>
	implements IOperation<TModel, TCreateDTo, TModel> {
	async apply(repository: BaseRepository<TModel>, createDto: TCreateDTo): Promise<TModel> {
		const createdModel = await repository.create(createDto);

		return createdModel;
	}
}
