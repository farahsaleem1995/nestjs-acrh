import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

export interface GetAllArgs<TFilter = any> {
	filter?: TFilter;
}

@Injectable({ scope: Scope.TRANSIENT })
export class GetAllOperation<TModel extends BaseModel>
	implements IOperation<TModel, TModel[], GetAllArgs> {
	async apply(repository: BaseRepository<TModel>, args: GetAllArgs): Promise<TModel[]> {
		const models = await repository.findAll({ ...args });

		return models;
	}
}
