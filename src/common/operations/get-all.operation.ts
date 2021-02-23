import { Injectable, Scope } from '@nestjs/common';
import { DataQuery } from 'src/data/interfaces';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

export interface GetAllArgs<TModel extends BaseModel, TQuery extends DataQuery<TModel>> {
	query?: TQuery;
}

@Injectable({ scope: Scope.TRANSIENT })
export class GetAllOperation<TModel extends BaseModel, TQuery extends DataQuery<TModel>>
	implements IOperation<TModel, TModel[], GetAllArgs<TModel, TQuery>> {
	async apply(
		repository: BaseRepository<TModel>,
		args: GetAllArgs<TModel, TQuery>,
	): Promise<TModel[]> {
		const { query } = args;

		const models = await repository.findAll(query);

		return models;
	}
}
